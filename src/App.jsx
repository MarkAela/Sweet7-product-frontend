
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import theme from "./theme/theme.js";
import MainLayout from "./layouts/MainLayout.jsx";

import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProductListPage />} />

                    <Route path="/home" element={<Home />} />

                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/searchresult" element={<ProductListPage />} />

                    <Route
                        path="/products/:id"
                        element={<ProductDetailsPage />}
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}
