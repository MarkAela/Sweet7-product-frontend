import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container,
    IconButton,
    Tooltip,
} from "@mui/material";

import {
    Home as HomeIcon,
    LocationOn as LocationIcon,
    ShoppingCart as CartIcon,
    ReceiptLong as OrdersIcon,
    Person as ProfileIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

import { Link as RouterLink, useLocation } from "react-router-dom";

const navigationItems = [
    { label: "Home", icon: HomeIcon, path: "/home" },
    { label: "Location", icon: LocationIcon, path: "/location" },
    { label: "Cart", icon: CartIcon, path: "/cart" },
    { label: "Orders", icon: OrdersIcon, path: "/orders" },
    { label: "Profile", icon: ProfileIcon, path: "/profile" },
    { label: "Settings", icon: SettingsIcon, path: "/settings" },
];

export default function Header() {
    const location = useLocation();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#FFFFFF",
                color: "#F8356C",
                borderBottom: "1px solid #F7DCE3",
                width: "100%",
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: { xs: 75, sm: 85, md: 90 },
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        py: { xs: 1, sm: 0 },
                    }}
                >
                    {/* LEFT SIDE - SWEET7 BRAND */}
                    <Box
                        component={RouterLink}
                        to="/home"
                        sx={{
                            textDecoration: "none",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: { xs: 1, sm: 1.5 },
                            flexShrink: 0,
                        }}
                    >
                        {/* CIRCULAR LOGO */}
                        <Box
                            component="img"
                            src="/sweet7-logo.png"
                            alt="Sweet7 Logo"
                            sx={{
                                width: { xs: 48, sm: 58, md: 65 },
                                height: { xs: 48, sm: 58, md: 65 },
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid #F7DCE3",
                                backgroundColor: "#FFF1F4",
                                display: "block",
                                flexShrink: 0,
                            }}
                        />

                        {/* BRAND NAME AND TAGLINE */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: '"Playfair Display", Georgia, serif',
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "1.8rem",
                                        md: "2rem",
                                    },
                                    fontWeight: 700,
                                    color: "#F8356C",
                                    letterSpacing: 0.5,
                                    lineHeight: 1.1,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Sweet7
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: {
                                        xs: "0.6rem",
                                        sm: "0.65rem",
                                        md: "0.7rem",
                                    },
                                    color: "#000000",
                                    letterSpacing: 0.3,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Every cake tells a sweet story.
                            </Typography>
                        </Box>
                    </Box>

                    {/* RIGHT SIDE - NAVIGATION ICONS */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: {
                                xs: 0.5,
                                sm: 1.5,
                                md: 2,
                            },
                            ml: "auto",
                            flexShrink: 0,
                            flexWrap: "nowrap",
                        }}
                    >
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            const active =
                                location.pathname === item.path;

                            return (
                                <Tooltip
                                    title={item.label}
                                    key={item.label}
                                >
                                    <IconButton
                                        component={RouterLink}
                                        to={item.path}
                                        aria-label={item.label}
                                        sx={{
                                            width: {
                                                xs: 38,
                                                sm: 42,
                                                md: 44,
                                            },
                                            height: {
                                                xs: 38,
                                                sm: 42,
                                                md: 44,
                                            },
                                            color: active
                                                ? "#FFFFFF"
                                                : "#F8356C",
                                            backgroundColor: active
                                                ? "#F8356C"
                                                : "transparent",
                                            borderRadius: "12px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            transition: "all 0.25s ease",

                                            "&:hover": {
                                                backgroundColor: "#F8356C",
                                                color: "#FFFFFF",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                fontSize: {
                                                    xs: 22,
                                                    sm: 25,
                                                    md: 27,
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
