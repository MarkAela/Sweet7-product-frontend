import React, { useState } from "react";

import {
    Box,
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    IconButton,
    Popover,
    Badge,
    Divider,
} from "@mui/material";

import {
    Search as SearchIcon,
    Tune as TuneIcon,
    RestartAlt as ResetIcon,
} from "@mui/icons-material";

// PRODUCT DATA - 30 CAKES
const products = [
    {
        id: 1,
        name: "Debut Cake",
        price: "₱ 1,100",
        category: "Debut Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 2,
        name: "Wedding Cake",
        price: "₱ 2,300",
        category: "Wedding Cake",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500",
    },
    {
        id: 3,
        name: "Vanilla Cake",
        price: "₱ 1,400",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500",
    },
    {
        id: 4,
        name: "Choco Cake",
        price: "₱ 500",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    },
    {
        id: 5,
        name: "Fruity Cake",
        price: "₱ 1,500",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    },
    {
        id: 6,
        name: "Pearl Cake",
        price: "₱ 1,400",
        category: "Pearl Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 7,
        name: "Chocolate Drip Cake",
        price: "₱ 1,800",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 8,
        name: "Strawberry Cake",
        price: "₱ 1,600",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    },
    {
        id: 9,
        name: "Classic Vanilla",
        price: "₱ 1,200",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=500",
    },
    {
        id: 10,
        name: "Rose Celebration Cake",
        price: "₱ 2,000",
        category: "Wedding Cake",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
    },
    {
        id: 11,
        name: "Caramel Crunch Cake",
        price: "₱ 1,750",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 12,
        name: "Mango Mousse Cake",
        price: "₱ 1,450",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    },
    {
        id: 13,
        name: "Blueberry Cheesecake",
        price: "₱ 1,850",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
    },
    {
        id: 14,
        name: "Red Velvet Heart Cake",
        price: "₱ 1,650",
        category: "Debut Cake",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500",
    },
    {
        id: 15,
        name: "Matcha Cream Cake",
        price: "₱ 1,550",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 16,
        name: "Cookies and Cream Cake",
        price: "₱ 1,700",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    },
    {
        id: 17,
        name: "Lemon Drizzle Cake",
        price: "₱ 1,350",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    },
    {
        id: 18,
        name: "Chocolate Fudge Cake",
        price: "₱ 1,950",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    },
    {
        id: 19,
        name: "Ube Macapuno Cake",
        price: "₱ 1,600",
        category: "Pearl Cake",
        image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=500",
    },
    {
        id: 20,
        name: "Birthday Sprinkle Cake",
        price: "₱ 1,400",
        category: "Debut Cake",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    },
    {
        id: 21,
        name: "Mocha Coffee Cake",
        price: "₱ 1,650",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 22,
        name: "Peach Shortcake",
        price: "₱ 1,500",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    },
    {
        id: 23,
        name: "Black Forest Deluxe",
        price: "₱ 1,850",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    },
    {
        id: 24,
        name: "Pink Blossom Cake",
        price: "₱ 2,100",
        category: "Wedding Cake",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500",
    },
    {
        id: 25,
        name: "Classic Buttercream Cake",
        price: "₱ 1,300",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500",
    },
    {
        id: 26,
        name: "Strawberry Shortcake",
        price: "₱ 1,750",
        category: "Fruity Cake",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500",
    },
    {
        id: 27,
        name: "Choco Hazelnut Cake",
        price: "₱ 1,900",
        category: "Choco Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
        id: 28,
        name: "Vanilla Berry Cake",
        price: "₱ 1,650",
        category: "Vanilla Cake",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
    },
    {
        id: 29,
        name: "Mini Celebration Cake",
        price: "₱ 950",
        category: "Debut Cake",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    },
    {
        id: 30,
        name: "Royal Wedding Cake",
        price: "₱ 2,800",
        category: "Wedding Cake",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500",
    },
];

// CAKE CATEGORIES
const categories = [
    "Wedding Cake",
    "Debut Cake",
    "Vanilla Cake",
    "Choco Cake",
    "Fruity Cake",
    "Pearl Cake",
];

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState("default");
    const [filterAnchor, setFilterAnchor] = useState(null);

    const filterOpen = Boolean(filterAnchor);

    // OPEN OR CLOSE FILTER PANEL
    const handleFilterClick = (event) => {
        if (filterOpen) {
            setFilterAnchor(null);
        } else {
            setFilterAnchor(event.currentTarget);
        }
    };

    const handleFilterClose = () => {
        setFilterAnchor(null);
    };

    // SELECT CAKE CATEGORY
    const handleCategoryChange = (category) => {
        setSelectedCategories((previous) =>
            previous.includes(category)
                ? previous.filter((item) => item !== category)
                : [...previous, category]
        );
    };

    // CLEAR CATEGORY FILTERS
    const clearFilters = () => {
        setSelectedCategories([]);
    };

    // SEARCH, FILTER, AND SORT PRODUCTS
    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (product) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)
        )
        .sort((a, b) => {
            if (sortOrder === "popular") {
                return b.id - a.id;
            }

            return a.id - b.id;
        });

    return (
        <Box
            sx={{
                bgcolor: "#FDBACD",
                minHeight: "100vh",
                py: 3,
            }}
        >
            <Container maxWidth="xl">

                {/* SEARCH AND FILTER TOOLBAR */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    {/* YOUTUBE-STYLE SORT CHIPS */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            scrollbarWidth: "none",
                        }}
                    >
                        <Button
                            size="small"
                            onClick={() => setSortOrder("default")}
                            sx={{
                                borderRadius: "8px",
                                px: 2,
                                py: 0.8,
                                minWidth: "auto",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                textTransform: "none",
                                whiteSpace: "nowrap",
                                bgcolor: "#FFFFFF",
                                color: "#F8356C",
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: "#F8356C",
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            Default
                        </Button>

                        <Button
                            size="small"
                            onClick={() => setSortOrder("popular")}
                            sx={{
                                borderRadius: "8px",
                                px: 2,
                                py: 0.8,
                                minWidth: "auto",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                textTransform: "none",
                                whiteSpace: "nowrap",
                                bgcolor: "#FFFFFF",
                                color: "#F8356C",
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: "#F8356C",
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            Popular
                        </Button>
                    </Stack>

                    {/* SEARCH AND FILTER */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <TextField
                            size="small"
                            placeholder="Search product..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            sx={{
                                                color: "#F8356C",
                                                fontSize: 21,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: { xs: 210, sm: 250 },

                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "30px",
                                    bgcolor: "#FFFFFF",

                                    "& fieldset": {
                                        borderColor: "#F0C9D2",
                                    },

                                    "&:hover fieldset": {
                                        borderColor: "#F8356C",
                                    },

                                    "&.Mui-focused fieldset": {
                                        borderColor: "#F8356C",
                                    },
                                },
                            }}
                        />

                        {/* FILTER BUTTON */}
                        <IconButton
                            onClick={handleFilterClick}
                            aria-label={
                                filterOpen
                                    ? "Close product filters"
                                    : "Open product filters"
                            }
                            aria-expanded={filterOpen}
                            sx={{
                                width: 44,
                                height: 44,
                                color: filterOpen
                                    ? "#FFFFFF"
                                    : "#F8356C",
                                bgcolor: filterOpen
                                    ? "#F8356C"
                                    : "transparent",
                                borderRadius: 2,
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: "#F8356C",
                                    color: "#FFFFFF",
                                },
                            }}
                        >
                            <Badge
                                badgeContent={selectedCategories.length}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        bgcolor: "#F8356C",
                                        color: "#FFFFFF",
                                    },
                                }}
                            >
                                <TuneIcon fontSize="medium" />
                            </Badge>
                        </IconButton>
                    </Stack>
                </Box>

                {/* FILTER POPUP */}
                <Popover
                    open={filterOpen}
                    anchorEl={filterAnchor}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            width: 300,
                            maxWidth: "calc(100vw - 24px)",
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: "0 8px 30px rgba(86, 61, 53, 0.16)",
                        },
                    }}
                >
                    {/* FILTER HEADER */}
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "#FFF3F1",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: "#563D35",
                                fontSize: "1rem",
                            }}
                        >
                            Filter Products
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: "#9B7770",
                            }}
                        >
                            Find your perfect cake
                        </Typography>
                    </Box>

                    <Divider />

                    {/* CATEGORY OPTIONS */}
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    color: "#563D35",
                                }}
                            >
                                Cake Categories
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#9B7770",
                                }}
                            >
                                {selectedCategories.length} selected
                            </Typography>
                        </Box>

                        <Stack spacing={0.5}>
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() =>
                                                handleCategoryChange(category)
                                            }
                                            sx={{
                                                color: "#E8A0B1",

                                                "&.Mui-checked": {
                                                    color: "#F8356C",
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#563D35",
                                            }}
                                        >
                                            {category}
                                        </Typography>
                                    }
                                    sx={{
                                        mx: 0,
                                        px: 1,
                                        borderRadius: 2,

                                        "&:hover": {
                                            bgcolor: "#FFF3F1",
                                        },
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Divider />

                    {/* FILTER ACTIONS */}
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ResetIcon />}
                            onClick={clearFilters}
                            sx={{
                                color: "#F8356C",
                                borderColor: "#F8356C",
                                borderRadius: 2,
                                textTransform: "none",

                                "&:hover": {
                                    borderColor: "#D9275A",
                                    bgcolor: "#FFF3F1",
                                },
                            }}
                        >
                            Clear All
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleFilterClose}
                            sx={{
                                bgcolor: "#F8356C",
                                color: "#FFFFFF",
                                borderRadius: 2,
                                textTransform: "none",

                                "&:hover": {
                                    bgcolor: "#D9275A",
                                },
                            }}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </Popover>

                {/* PRODUCT GRID */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            sm: "repeat(3, minmax(0, 1fr))",
                            md: "repeat(5, minmax(0, 1fr))",
                        },
                        gap: 2,
                    }}
                >
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                boxShadow: "none",
                                bgcolor: "#FFFFFF",
                                textAlign: "center",
                                border: "2px solid #F7DCE3",
                                borderRadius: 3,
                                overflow: "hidden",
                                transition: "all 0.25s ease",

                                "&:hover": {
                                    border: "2px solid #F8356C",
                                    boxShadow:
                                        "0 8px 20px rgba(248, 53, 108, 0.16)",
                                    transform: "translateY(-4px)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    width: "100%",
                                    height: 160,
                                    objectFit: "cover",
                                }}
                            />

                            <CardContent
                                sx={{
                                    p: 1,

                                    "&:last-child": {
                                        pb: 1,
                                    },
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#563D35",
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#8B7770",
                                    }}
                                >
                                    {product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* EMPTY SEARCH RESULT */}
                {filteredProducts.length === 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 3,
                            p: 4,
                            textAlign: "center",
                            bgcolor: "#FFF8F6",
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: "#563D35",
                                mb: 1,
                            }}
                        >
                            No cakes found
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#9B7770",
                            }}
                        >
                            Try another search or change your filters.
                        </Typography>

                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                clearFilters();
                            }}
                            sx={{
                                mt: 1,
                                color: "#F8356C",
                                textTransform: "none",
                            }}
                        >
                            Reset Search and Filters
                        </Button>
                    </Paper>
                )}

                {/* FOOTER - NO WHITE BOX */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        columnGap: { xs: 2, sm: 4 },
                        rowGap: 1,
                        mt: 3,
                        py: 1,
                        px: 2,
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
                            variant="body2"
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                color: "#F9628D",
                                px: 0.5,
                                py: 0.25,
                                borderRadius: 1,
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    color: "#F8356C",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>

            </Container>
        </Box>
    );
}
