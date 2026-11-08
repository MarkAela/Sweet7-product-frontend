import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import api from "../api/axios.js";

export default function ProductDetailsPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProduct() {
            setLoading(true);
            setError("");
            setProduct(null);

            try {
                const response = await api.get(`/products/${id}`);

                const data = response.data?.data ?? response.data;

                if (active) {
                    setProduct({
                        id: data.product_id ?? data.id,
                        name: data.product_name ?? data.name,
                        description:
                            data.product_description ?? data.description,
                        image: data.product_image ?? data.image,
                        price: data.product_price ?? data.price,
                        category: data.category,
                    });
                }
            } catch (err) {
                console.error("Unable to load product:", err);

                if (active) {
                    setError("Unable to find this product.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress sx={{ color: "#C77D87" }} />
            </Box>
        );
    }

    if (error || !product) {
        return (
            <Box sx={{ maxWidth: 1450, mx: "auto", p: { xs: 2, md: 4 } }}>
                <Alert severity="warning" sx={{ mb: 3 }}>
                    {error || "Product not found."}
                </Alert>

                <Button component={Link} to="/" sx={{ color: "#563D35" }}>
                    ← Back to Products
                </Button>
            </Box>
        );
    }

    const category =
        typeof product.category === "string"
            ? product.category
            : product.category?.name ?? "Uncategorized";

    const image =
        product.image ||
        "https://placehold.co/600x400?text=Sweet7";

    return (
        <Box
            sx={{
                maxWidth: 1450,
                mx: "auto",
                p: { xs: 2, md: 4 },
            }}
        >
            <Button
                component={Link}
                to="/"
                sx={{
                    color: "#563D35",
                    mb: 3,
                    fontWeight: 600,
                }}
            >
                ← Back to Products
            </Button>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: 4,
                    backgroundColor: "#FFFDFD",
                    p: { xs: 2, md: 4 },
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                <Box
                    component="img"
                    src={image}
                    alt={product.name || "Sweet7 cake"}
                    onError={(event) => {
                        event.currentTarget.src =
                            "https://placehold.co/600x400?text=Sweet7";
                    }}
                    sx={{
                        width: "100%",
                        height: { xs: 260, md: 400 },
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: 28, md: 36 },
                            fontWeight: 700,
                            color: "#563D35",
                            mb: 2,
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Typography sx={{ fontSize: 16, color: "#8B7770", mb: 2 }}>
                        Category: {category}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#C77D87",
                            mb: 3,
                        }}
                    >
                        ₱{Number(product.price ?? 0).toFixed(2)}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 16,
                            color: "#563D35",
                            lineHeight: 1.8,
                        }}
                    >
                        {product.description ||
                            "No description available for this cake."}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
