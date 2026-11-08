import { useCallback, useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Collapse,
    IconButton,
    InputAdornment,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import api from "../api/axios.js";
import ProductFormDialog from "../components/ProductFormDialog.jsx";
import DeleteProductDialog from "../components/DeleteProductDialog.jsx";


function normalizeProduct(product) {
    return {
        id: product.product_id ?? product.id,
        name: product.product_name ?? product.name ?? "",
        description:
            product.product_description ?? product.description ?? "",
        image: product.product_image ?? product.image ?? "",
        price: Number(product.product_price ?? product.price ?? 0),
        category: product.category ?? "",
        seller_id: product.seller_id,
    };
}

function toApiProduct(values) {
    return {
        product_name: values.name,
        product_description: values.description,
        product_image: values.image,
        product_price: Number(values.price),
        category: values.category,
        seller_id: 2,
    };
}

export default function ProductListPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    const [openForm, setOpenForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [openDelete, setOpenDelete] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const [showFilters, setShowFilters] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // NOTIFICATION
    const showMessage = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    // LOAD PRODUCTS
    const loadProducts = useCallback(async () => {
        setLoading(true);
        setPageError("");

        try {
            const response = await api.get("/products");
            const records = response.data?.data ?? response.data;

            const normalized = records
                .map(normalizeProduct)
                .filter((product) => Number(product.seller_id) === 2);

            setProducts(normalized);
        } catch (error) {
            console.error("Product loading error:", error);
            setPageError(
                "Unable to load products. Please check your connection."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // ADD PRODUCT
    const handleAdd = () => {
        setSelectedProduct(null);
        setOpenForm(true);
    };

    // EDIT PRODUCT
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setOpenForm(true);
    };

    // SAVE PRODUCT
    const handleSave = async (values) => {
        try {
            const payload = toApiProduct(values);

            if (selectedProduct) {
                await api.patch(
                    `/products/${selectedProduct.id}`,
                    payload
                );

                showMessage("Product updated successfully!");
            } else {
                await api.post("/products", payload);

                showMessage("Product added successfully!");
            }

            setOpenForm(false);
            setSelectedProduct(null);

            await loadProducts();
        } catch (error) {
            console.error("Product saving error:", error);

            const message =
                error.response?.data?.message ||
                "Unable to save product. Please check the form and API.";

            showMessage(message, "error");
        }
    };

    // DELETE PRODUCT
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;

        try {
            await api.delete(`/products/${productToDelete.id}`);

            setProducts((previous) =>
                previous.filter(
                    (product) => product.id !== productToDelete.id
                )
            );

            showMessage("Product deleted successfully!");
        } catch (error) {
            console.error("Product deletion error:", error);
            showMessage("Unable to delete product.", "error");
        } finally {
            setOpenDelete(false);
            setProductToDelete(null);
        }
    };

    // CATEGORY OPTIONS
    const categories = [
        "All",
        ...new Set(
            products
                .map((product) => product.category)
                .filter(Boolean)
        ),
    ];

    // FILTER AND SORT PRODUCTS
    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter(
            (product) =>
                categoryFilter === "All" ||
                product.category === categoryFilter
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

    // SEARCH SUGGESTIONS
    const suggestions = [
        ...new Set([
            ...products.map((product) => product.name),
            ...categories.filter((category) => category !== "All"),
        ]),
    ]
        .filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5);

    const selectSuggestion = (value) => {
        setSearch(value);
        setShowSuggestions(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#EBD0C8",
                px: { xs: 1.5, sm: 3, md: 5 },
                py: 2,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1250,
                    mx: "auto",
                    minHeight: "calc(100vh - 32px)",
                    border: "1px solid #B9A6A0",
                    backgroundColor: "#EBD0C8",
                    display: "flex",
                    flexDirection: "column",
                    px: { xs: 2, sm: 4, md: 5 },
                    py: 2,
                }}
            >
                {/* PAGE TITLE */}
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "#222222",
                        mb: 1.5,
                    }}
                >
                    Search Result
                </Typography>

                {/* HEADER */}
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #B9A6A0",
                        height: 45,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 1.5,
                        mb: 1,
                    }}
                >
                    {/* SWEET7 LOGO */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                backgroundColor: "#D0E2D0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.1rem",
                            }}
                        >
                            🍰
                        </Box>

                        <Typography
                            sx={{
                                color: "#D99583",
                                fontFamily: '"Playfair Display", serif',
                                fontStyle: "italic",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                lineHeight: 1,
                            }}
                        >
                            SWEET
                            <br />
                            7
                        </Typography>
                    </Stack>

                    {/* HEADER ACTIONS */}
                    <Stack direction="row" spacing={0.5}>
                        <IconButton
                            size="small"
                            onClick={() => navigate("/login")}
                            title="Profile"
                        >
                            <PersonOutlineOutlinedIcon
                                sx={{ color: "#222222" }}
                            />
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={() => navigate("/admin")}
                            title="Admin Settings"
                        >
                            <SettingsOutlinedIcon
                                sx={{ color: "#222222" }}
                            />
                        </IconButton>
                    </Stack>
                </Box>

                {/* SEARCH BAR AND FILTER */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                        mb: 1,
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Search product..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setShowSuggestions(false);
                            }
                            if (event.key === "Escape") {
                                setShowSuggestions(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlinedIcon
                                        sx={{ color: "#222222" }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: { xs: "75%", sm: 260 },
                            "& .MuiOutlinedInput-root": {
                                height: 32,
                                backgroundColor: "#E6D6D2",
                                borderRadius: 1,
                                fontSize: "0.8rem",
                            },
                            "& fieldset": {
                                border: "none",
                            },
                        }}
                    />

                    <IconButton
                        size="small"
                        onClick={() => {
                            setShowFilters(!showFilters);
                            setShowSuggestions(false);
                        }}
                        title="Filter products"
                    >
                        <TuneOutlinedIcon sx={{ color: "#222222" }} />
                    </IconButton>

                    {/* SEARCH SUGGESTIONS */}
                    {showSuggestions && suggestions.length > 0 && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "100%",
                                right: 35,
                                zIndex: 10,
                                width: { xs: "70%", sm: 220 },
                                backgroundColor: "#E6D6D2",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                                borderRadius: 1,
                            }}
                        >
                            {suggestions.map((suggestion) => (
                                <Box
                                    key={suggestion}
                                    onMouseDown={() =>
                                        selectSuggestion(suggestion)
                                    }
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        fontSize: "0.75rem",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "#D5C0BA",
                                        },
                                    }}
                                >
                                    {suggestion}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* FILTER OPTIONS */}
                <Collapse in={showFilters}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 1.5,
                            mb: 2,
                            justifyContent: "flex-end",
                        }}
                    >
                        <TextField
                            select
                            size="small"
                            label="Category"
                            value={categoryFilter}
                            onChange={(event) =>
                                setCategoryFilter(event.target.value)
                            }
                            sx={{
                                minWidth: 140,
                                backgroundColor: "#FFFFFF",
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            size="small"
                            label="Sort by"
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value)
                            }
                            sx={{
                                minWidth: 160,
                                backgroundColor: "#FFFFFF",
                            }}
                        >
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="name-asc">Name: A-Z</MenuItem>
                            <MenuItem value="name-desc">Name: Z-A</MenuItem>
                            <MenuItem value="price-low">
                                Price: Low to High
                            </MenuItem>
                            <MenuItem value="price-high">
                                Price: High to Low
                            </MenuItem>
                        </TextField>
                    </Box>
                </Collapse>

                {/* ADD PRODUCT */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                    <Button
                        size="small"
                        startIcon={<AddOutlinedIcon />}
                        onClick={handleAdd}
                        sx={{
                            color: "#563D35",
                            textTransform: "none",
                            fontSize: "0.75rem",
                        }}
                    >
                        Add Product
                    </Button>
                </Box>

                {/* PRODUCTS */}
                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: 240,
                    }}
                >
                    {loading && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 8,
                            }}
                        >
                            <CircularProgress sx={{ color: "#C77D87" }} />
                        </Box>
                    )}

                    {!loading && pageError && (
                        <Alert severity="error">{pageError}</Alert>
                    )}

                    {!loading &&
                        !pageError &&
                        filteredProducts.length === 0 && (
                            <Alert severity="info">
                                No products found. Try another search or category.
                            </Alert>
                        )}

                    {!loading &&
                        !pageError &&
                        filteredProducts.length > 0 && (
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "repeat(2, minmax(0, 1fr))",
                                        sm: "repeat(2, minmax(0, 1fr))",
                                        md: "repeat(3, minmax(0, 1fr))",
                                    },
                                    gap: { xs: 2, sm: 3, md: 4 },
                                    maxWidth: 850,
                                    mx: "auto",
                                    mt: 2,
                                }}
                            >
                                {filteredProducts.map((product) => (
                                    <Card
                                        key={product.id}
                                        elevation={0}
                                        sx={{
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            textAlign: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* PRODUCT IMAGE */}
                                        <CardMedia
                                            component="img"
                                            image={
                                                product.image ||
                                                "https://placehold.co/300x300?text=Sweet7"
                                            }
                                            alt={product.name}
                                            onError={(event) => {
                                                event.currentTarget.src =
                                                    "https://placehold.co/300x300?text=Image+Unavailable";
                                            }}
                                            sx={{
                                                width: "100%",
                                                maxWidth: 150,
                                                height: 140,
                                                objectFit: "cover",
                                                borderRadius: 0,
                                                backgroundColor: "#E1C9C2",
                                            }}
                                        />

                                        {/* PRODUCT INFORMATION */}
                                        <CardContent
                                            sx={{
                                                p: 0.5,
                                                width: "100%",
                                                "&:last-child": {
                                                    pb: 0.5,
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#111111",
                                                    fontWeight: 700,
                                                    fontSize: {
                                                        xs: "0.85rem",
                                                        sm: "1rem",
                                                    },
                                                }}
                                            >
                                                {product.name}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#222222",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                ₱{" "}
                                                {product.price.toLocaleString(
                                                    "en-PH"
                                                )}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#755D55",
                                                    fontSize: "0.7rem",
                                                }}
                                            >
                                                {product.category}
                                            </Typography>
                                        </CardContent>

                                        {/* PRODUCT ACTIONS */}
                                        <CardActions
                                            sx={{
                                                p: 0,
                                                gap: 0.5,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Button
                                                component={Link}
                                                to={`/products/${product.id}`}
                                                size="small"
                                                sx={{
                                                    color: "#563D35",
                                                    fontSize: "0.7rem",
                                                    textTransform: "none",
                                                    minWidth: 0,
                                                }}
                                            >
                                                Details
                                            </Button>

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                                title="Edit product"
                                            >
                                                <EditOutlinedIcon
                                                    sx={{ fontSize: 17 }}
                                                />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    handleDeleteClick(product)
                                                }
                                                title="Delete product"
                                            >
                                               <DeleteIcon
                                                    sx={{
                                                         fontSize: 17,
                                                            color: "#B33A3A",
                                                      }}
                                            />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        )}
                </Box>

                {/* BOTTOM NAVIGATION */}
                <Box
                    sx={{
                        mt: 3,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        maxWidth: 650,
                        width: "100%",
                        mx: "auto",
                    }}
                >
                    <IconButton
                        onClick={() => navigate("/home")}
                        title="Home"
                    >
                        <HomeOutlinedIcon
                            sx={{ fontSize: 27, color: "#111111" }}
                        />
                    </IconButton>

                    <IconButton
                        disabled
                        title="Location (not yet available)"
                    >
                        <LocationOnOutlinedIcon
                            sx={{ fontSize: 25, color: "#111111" }}
                        />
                    </IconButton>

                    <IconButton
                        onClick={() => navigate("/cart")}
                        title="Shopping Cart"
                    >
                        <ShoppingCartOutlinedIcon
                            sx={{ fontSize: 25, color: "#111111" }}
                        />
                    </IconButton>

                    <IconButton
                        onClick={() => setShowFilters(!showFilters)}
                        title="Product filters"
                    >
                        <MenuOutlinedIcon
                            sx={{ fontSize: 27, color: "#111111" }}
                        />
                    </IconButton>

                    <IconButton
                        onClick={() => navigate("/login")}
                        title="Profile"
                    >
                        <PersonOutlineOutlinedIcon
                            sx={{ fontSize: 27, color: "#111111" }}
                        />
                    </IconButton>
                </Box>

                {/* FOOTER */}
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #B9A6A0",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                        py: 1,
                        px: 1,
                    }}
                >
                    {[
                        "About Us",
                        "Contact Us",
                        "Privacy Policy",
                        "Terms and Conditions",
                    ].map((item) => (
                        <Typography
                            key={item}
                            sx={{
                                fontSize: {
                                    xs: "0.65rem",
                                    sm: "0.75rem",
                                },
                                fontWeight: 700,
                                color: "#111111",
                                cursor: "pointer",
                                textAlign: "center",
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* ADD / EDIT PRODUCT DIALOG */}
            <ProductFormDialog
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setSelectedProduct(null);
                }}
                onSave={handleSave}
                product={selectedProduct}
            />

            {/* DELETE PRODUCT DIALOG */}
            <DeleteProductDialog
                open={openDelete}
                onClose={() => {
                    setOpenDelete(false);
                    setProductToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                product={productToDelete}
            />

            {/* NOTIFICATIONS */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar((previous) => ({
                        ...previous,
                        open: false,
                    }))
                }
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() =>
                        setSnackbar((previous) => ({
                            ...previous,
                            open: false,
                        }))
                    }
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
