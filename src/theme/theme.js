
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C77D87",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#563D35",
    },
    background: {
      default: "#EACFC6",
      paper: "#FFF8F7",
    },
    text: {
      primary: "#563D35",
      secondary: "#8B7770",
    },
    error: {
      main: "#C0394B",
    },
  },

  shape: {
    borderRadius: 0,
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#FFF8F7",
          boxShadow: "0 4px 18px rgba(86, 61, 53, 0.08)",
        },
      },
    },
  },
});

export default theme;
