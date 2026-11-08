
import React from "react";
import { Box, Button } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductActions() {
  const buttonStyle = {
    backgroundColor: "#A69B9B",
    color: "#F4B6C2",
    borderRadius: 0,
    boxShadow: "none",
    padding: "8px 10px",
    minWidth: 0,
    fontSize: "13px",

    "&:hover": {
      backgroundColor: "#918585",
      boxShadow: "none",
    },

    "& .MuiButton-startIcon": {
      color: "#F4B6C2",
      marginRight: "5px",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "8px",
      }}
    >
      <Button
        startIcon={<VisibilityIcon />}
        sx={buttonStyle}
      >
        Details
      </Button>

      <Button
        startIcon={<EditIcon />}
        sx={buttonStyle}
      >
        Edit
      </Button>

      <Button
        startIcon={<DeleteIcon />}
        sx={buttonStyle}
      >
        Delete
      </Button>
    </Box>
  );
}

export default ProductActions;
