
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    TextField,
    Avatar,
    IconButton,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    // SIDEBAR NAVIGATION
    const menuItems = [
        {
            title: "Dashboard",
            icon: <DashboardOutlinedIcon />,
            path: "/admin",
            available: true,
        },
        {
            title: "Home",
            icon: <HomeOutlinedIcon />,
            path: "/home",
            available: true,
        },
        {
            title: "Users",
            icon: <PeopleAltOutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Categories",
            icon: <CategoryOutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Products",
            icon: <ShoppingBagOutlinedIcon />,
            path: "/",
            available: true,
        },
        {
            title: "Inventory",
            icon: <Inventory2OutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Orders",
            icon: <ReceiptLongOutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Cart",
            icon: <ShoppingCartOutlinedIcon />,
            path: "/cart",
            available: true,
        },
        {
            title: "Reviews",
            icon: <RateReviewOutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Reports",
            icon: <BarChartOutlinedIcon />,
            path: null,
            available: false,
        },
        {
            title: "Settings",
            icon: <SettingsOutlinedIcon />,
            path: null,
            available: false,
        },
    ];

    // DASHBOARD STATISTICS
    const stats = [
        {
            title: "Users",
            value: "Coming Soon",
            icon: <PeopleAltOutlinedIcon />,
            color: "#08BCD0",
        },
        {
            title: "Products",
            value: "Manage",
            icon: <ShoppingBagOutlinedIcon />,
            color: "#DDA8E9",
        },
        {
            title: "Orders",
            value: "Coming Soon",
            icon: <Inventory2OutlinedIcon />,
            color: "#79D653",
        },
        {
            title: "Sales",
            value: "Coming Soon",
            icon: <BarChartOutlinedIcon />,
            color: "#FF3838",
        },
    ];

    const panelStyle = {
        backgroundColor: "#FFFFFF",
        border: "1.5px solid #222222",
        borderRadius: "5px",
        boxShadow: "none",
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#EBD0C8",
                p: { xs: 1, md: 2 },
                display: "flex",
                gap: 2,
                boxSizing: "border-box",
            }}
        >
            {/* SIDEBAR */}
            <Box
                sx={{
                    width: { xs: "65px", sm: "190px", md: "230px" },
                    flexShrink: 0,
                    backgroundColor: "#B9B1AF",
                    minHeight: "calc(100vh - 32px)",
                    p: { xs: 1, md: 2 },
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* ADMIN PROFILE */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 4, mt: 1 }}
                >
                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            bgcolor: "#806D68",
                            fontWeight: 700,
                        }}
                    >
                        S7
                    </Avatar>

                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Typography fontWeight={700} fontSize="0.9rem">
                            Sweet7 Admin
                        </Typography>

                        <Typography fontSize="0.65rem">
                            admin@sweet7.com
                        </Typography>
                    </Box>
                </Stack>

                {/* NAVIGATION */}
                <Stack spacing={0.7}>
                    {menuItems.map((item) => {
                        const isActive =
                            item.path === location.pathname;

                        return (
                            <Button
                                key={item.title}
                                disabled={!item.available}
                                onClick={() => {
                                    if (item.available) {
                                        navigate(item.path);
                                    }
                                }}
                                startIcon={item.icon}
                                sx={{
                                    justifyContent: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                    minWidth: 0,
                                    px: { xs: 0.5, sm: 1 },
                                    py: 0.8,
                                    color: isActive
                                        ? "#FFFFFF"
                                        : "#222222",
                                    backgroundColor: isActive
                                        ? "#111111"
                                        : "transparent",
                                    borderRadius: "5px",
                                    textTransform: "none",
                                    fontSize: "0.95rem",
                                    opacity: item.available ? 1 : 0.55,

                                    "& .MuiButton-startIcon": {
                                        margin: {
                                            xs: 0,
                                            sm: "0 9px 0 0",
                                        },
                                    },

                                    "&:hover": {
                                        backgroundColor: isActive
                                            ? "#333333"
                                            : "#D1C9C7",
                                    },

                                    "&.Mui-disabled": {
                                        color: "#222222",
                                    },
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        display: {
                                            xs: "none",
                                            sm: "inline",
                                        },
                                    }}
                                >
                                    {item.title}
                                </Box>
                            </Button>
                        );
                    })}
                </Stack>

                <Box sx={{ flexGrow: 1 }} />

                {/* LOG OUT */}
                <Button
                    startIcon={<LogoutOutlinedIcon />}
                    onClick={() => navigate("/login")}
                    sx={{
                        justifyContent: {
                            xs: "center",
                            sm: "flex-start",
                        },
                        color: "#222222",
                        textTransform: "none",
                        mt: 3,

                        "& .MuiButton-startIcon": {
                            margin: {
                                xs: 0,
                                sm: "0 9px 0 0",
                            },
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "inline",
                            },
                        }}
                    >
                        Log out
                    </Box>
                </Button>
            </Box>

            {/* MAIN CONTENT */}
            <Box
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    pr: { xs: 0, md: 4 },
                }}
            >
                {/* TOP HEADER */}
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1, md: 2 }}
                    sx={{
                        height: 75,
                        px: { xs: 0, md: 2 },
                        borderBottom: "1px solid #BFA9A3",
                        mb: 1,
                    }}
                >
                    <IconButton>
                        <MenuOutlinedIcon />
                    </IconButton>

                    <TextField
                        placeholder="Search..."
                        size="small"
                        sx={{
                            width: { xs: "100%", sm: "350px" },
                            backgroundColor: "#FFFFFF",

                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,

                                "& fieldset": {
                                    border: "2px solid #222222",
                                },
                            },
                        }}
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton>
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>

                    <IconButton>
                        <PersonOutlineOutlinedIcon />
                    </IconButton>
                </Stack>

                {/* DASHBOARD PANEL */}
                <Box
                    sx={{
                        ...panelStyle,
                        p: { xs: 2, sm: 2.5, md: 3 },
                        minHeight: "calc(100vh - 125px)",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            color: "#222222",
                            mb: 2,
                        }}
                    >
                        Dashboard
                    </Typography>

                    {/* STATISTICS CARDS */}
                    <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
                        {stats.map((item) => (
                            <Grid
                                item
                                xs={6}
                                md={3}
                                key={item.title}
                            >
                                <Card
                                    elevation={0}
                                    sx={{
                                        backgroundColor: item.color,
                                        borderRadius: "6px",
                                        border: "1px solid rgba(0,0,0,0.15)",
                                        minHeight: 95,
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 1.5,
                                            textAlign: "center",
                                            "&:last-child": {
                                                pb: 1.5,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                mb: 0.5,
                                            }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Typography fontWeight={700}>
                                            {item.title}
                                        </Typography>

                                        <Typography sx={{ mt: 0.5 }}>
                                            {item.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* CHARTS */}
                    <Grid container spacing={3}>

                        {/* SALES OVERVIEW */}
                        <Grid item xs={12} md={6}>
                            <Card
                                elevation={0}
                                sx={{
                                    ...panelStyle,
                                    minHeight: 220,
                                    p: 1.8,
                                }}
                            >
                                <Typography
                                    fontSize="0.95rem"
                                    mb={1}
                                >
                                    Sales Overview
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Sales chart preview
                                </Typography>

                                <Box
                                    sx={{
                                        height: 145,
                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: "space-around",
                                        px: 1,
                                        position: "relative",
                                        borderBottom: "2px solid #77568A",
                                        borderLeft: "2px solid #77568A",
                                        ml: 2,
                                        mr: 2,
                                        mt: 1,
                                    }}
                                >
                                    {[35, 55, 48, 85, 65].map(
                                        (height, i) => (
                                            <Box
                                                key={i}
                                                sx={{
                                                    width: "9%",
                                                    height: `${height}%`,
                                                    backgroundColor: [
                                                        "#FFC83D",
                                                        "#CDA8D7",
                                                        "#E67C83",
                                                        "#83B65C",
                                                        "#8CC9D9",
                                                    ][i],
                                                    border: "1px solid rgba(0,0,0,0.2)",
                                                }}
                                            />
                                        )
                                    )}

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "10%",
                                            left: "5%",
                                            right: "5%",
                                            height: "55%",
                                        }}
                                    >
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 300 100"
                                            preserveAspectRatio="none"
                                        >
                                            <polyline
                                                points="5,80 55,48 110,65 170,12 225,35 285,0"
                                                fill="none"
                                                stroke="#F07816"
                                                strokeWidth="3"
                                            />
                                        </svg>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>

                        {/* ORDER STATUS */}
                        <Grid item xs={12} md={6}>
                            <Card
                                elevation={0}
                                sx={{
                                    ...panelStyle,
                                    minHeight: 220,
                                    p: 1.8,
                                }}
                            >
                                <Typography
                                    fontSize="0.95rem"
                                    mb={2}
                                >
                                    Order Status
                                </Typography>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={2}
                                    sx={{ minHeight: 145 }}
                                >
                                    <Box
                                        sx={{
                                            width: 125,
                                            height: 125,
                                            borderRadius: "50%",
                                            flexShrink: 0,
                                            background:
                                                "conic-gradient(#F3C43B 0% 25%, #62B957 25% 37%, #168BC8 37% 62%, #E52525 62% 100%)",
                                            position: "relative",

                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                inset: 0,
                                                borderRadius: "50%",
                                                background:
                                                    "conic-gradient(transparent 0deg 88deg, white 88deg 91deg, transparent 91deg 133deg, white 133deg 136deg, transparent 136deg 223deg, white 223deg 226deg, transparent 226deg 358deg, white 358deg 360deg)",
                                            },
                                        }}
                                    />

                                    <Stack spacing={0.3}>
                                        {[
                                            ["Pending", "#F3C43B"],
                                            ["Processing", "#62B957"],
                                            ["Shipped", "#168BC8"],
                                            ["Delivered", "#E52525"],
                                            ["Cancelled", "#999999"],
                                        ].map(([label, color]) => (
                                            <Stack
                                                key={label}
                                                direction="row"
                                                spacing={0.8}
                                                alignItems="center"
                                            >
                                                <Box
                                                    sx={{
                                                        width: 9,
                                                        height: 9,
                                                        borderRadius: "50%",
                                                        backgroundColor: color,
                                                    }}
                                                />

                                                <Typography
                                                    fontSize="0.72rem"
                                                    lineHeight={1.3}
                                                >
                                                    {label}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* PRODUCT MANAGEMENT */}
                    <Card
                        elevation={0}
                        sx={{
                            ...panelStyle,
                            mt: 3,
                            p: 2,
                        }}
                    >
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            alignItems={{
                                xs: "stretch",
                                sm: "center",
                            }}
                            justifyContent="space-between"
                            spacing={2}
                        >
                            <Box>
                                <Typography
                                    fontWeight={700}
                                    fontSize="1rem"
                                >
                                    Product Management
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    fontSize="0.85rem"
                                >
                                    View, add, edit, and delete your Sweet7 products.
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                startIcon={<StorefrontOutlinedIcon />}
                                onClick={() => navigate("/")}
                                sx={{
                                    backgroundColor: "#C77D87",
                                    textTransform: "none",
                                    borderRadius: 2,

                                    "&:hover": {
                                        backgroundColor: "#A95F6A",
                                    },
                                }}
                            >
                                Manage Products
                            </Button>
                        </Stack>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
