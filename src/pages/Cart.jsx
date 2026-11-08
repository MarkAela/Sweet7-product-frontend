
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    IconButton,
    Stack,
    Divider,
    Paper,
} from "@mui/material";

// Material UI Icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// Sample cart items
const initialCart = [
    {
        id: 1,
        name: "Chocolate Cake",
        price: 850,
        quantity: 1,
        image: "https://placehold.co/300x250?text=Chocolate+Cake",
    },
    {
        id: 2,
        name: "Wedding Cake",
        price: 1500,
        quantity: 1,
        image: "https://placehold.co/300x250?text=Wedding+Cake",
    },
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCart);
    const navigate = useNavigate();

    // Increase quantity
    const increaseQuantity = (id) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (id) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max(1, item.quantity - 1),
                      }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeItem = (id) => {
        setCartItems((items) =>
            items.filter((item) => item.id !== id)
        );
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Currency formatter
    const formatPrice = (price) =>
        price.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <Box
            sx={{
                backgroundColor: "#FFF8F5",
                minHeight: "100vh",
                py: 5,
            }}
        >
            <Container maxWidth="lg">

                {/* Page Heading */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#6B3E3E"
                    mb={1}
                >
                    My Shopping Cart
                </Typography>

                <Typography color="text.secondary" mb={4}>
                    Review your selected cakes before checkout.
                </Typography>

                {/* Empty Cart */}
                {cartItems.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: "center",
                            borderRadius: 3,
                        }}
                    >
                        <ShoppingCartOutlinedIcon
                            sx={{
                                fontSize: 65,
                                color: "#D98C9B",
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            Your cart is empty!
                        </Typography>

                        <Typography color="text.secondary" my={2}>
                            You haven't added any cakes to your cart yet.
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/")}
                            sx={{
                                backgroundColor: "#D98C9B",
                                "&:hover": {
                                    backgroundColor: "#C47788",
                                },
                            }}
                        >
                            Browse Cakes
                        </Button>
                    </Paper>
                ) : (

                    /* Cart Items and Order Summary */
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        alignItems="flex-start"
                    >

                        {/* Cart Items */}
                        <Box sx={{ flex: 1, width: "100%" }}>

                            {cartItems.map((item) => (
                                <Card
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        mb: 2,
                                        borderRadius: 3,
                                        boxShadow: 1,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: {
                                                xs: 100,
                                                sm: 160,
                                            },
                                            objectFit: "cover",
                                        }}
                                    />

                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {item.name}
                                        </Typography>

                                        <Typography color="secondary">
                                            ₱{formatPrice(item.price)}
                                        </Typography>

                                        {/* Quantity Controls */}
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            mt={2}
                                        >
                                            <IconButton
                                                size="small"
                                                aria-label="Decrease quantity"
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                            >
                                                <RemoveIcon />
                                            </IconButton>

                                            <Typography>
                                                {item.quantity}
                                            </Typography>

                                            <IconButton
                                                size="small"
                                                aria-label="Increase quantity"
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>

                                            {/* Delete Item */}
                                            <IconButton
                                                color="error"
                                                aria-label="Remove item"
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                            >
                                                <DeleteOutlinedIcon />
                                            </IconButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}

                        </Box>

                        {/* Order Summary */}
                        <Paper
                            elevation={1}
                            sx={{
                                p: 3,
                                width: {
                                    xs: "100%",
                                    md: 320,
                                },
                                borderRadius: 3,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                Order Summary
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={2}
                            >
                                <Typography>
                                    Subtotal
                                </Typography>

                                <Typography fontWeight="bold">
                                    ₱{formatPrice(subtotal)}
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={2}
                            >
                                <Typography>
                                    Shipping
                                </Typography>

                                <Typography variant="body2">
                                    Calculated at checkout
                                </Typography>
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mb={3}
                            >
                                <Typography fontWeight="bold">
                                    Total
                                </Typography>

                                <Typography
                                    fontWeight="bold"
                                    color="#D98C9B"
                                >
                                    ₱{formatPrice(subtotal)}
                                </Typography>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => navigate("/checkout")}
                                sx={{
                                    py: 1.5,
                                    backgroundColor: "#D98C9B",
                                    "&:hover": {
                                        backgroundColor: "#C47788",
                                    },
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                        </Paper>

                    </Stack>
                )}

            </Container>
        </Box>
    );
}
