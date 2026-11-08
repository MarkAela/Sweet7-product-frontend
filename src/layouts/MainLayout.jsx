
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <>
            <Header />

            <Box
                component="main"
                sx={{
                    minHeight: "calc(100vh - 90px)",
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}
