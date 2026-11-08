
import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip
} from "@mui/material";

import ProductActions from "../ProductActions.jsx";

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        borderRadius: "18px",
        overflow: "hidden",
        backgroundColor: "#F2F2F2",
        boxShadow: "0 5px 20px rgba(86, 61, 53, 0.08)",
        border: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          width: "100%",
          height: 190,
          overflow: "hidden",
          backgroundColor: "#F3DAD5"
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </Box>

      {/* Product Information */}
      <CardContent
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          "&:last-child": {
            paddingBottom: 2
          }
        }}
      >
        {/* Category */}
        <Chip
          label={product.category}
          size="small"
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#E5E5E5",
            color: "#563D35",
            fontSize: 12,
            marginBottom: 1.2
          }}
        />

        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontSize: 19,
            fontWeight: 700,
            textAlign: "left",
            color: "#563D35",
            minHeight: 35
          }}
        >
          {product.name}
        </Typography>

        {/* Product Price */}
        <Typography
          sx={{
            color: "#C77D87",
            fontWeight: 700,
            fontSize: 20,
            textAlign: "left",
            marginBottom: 2
          }}
        >
          ₱{product.price.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </Typography>

        {/* Product Actions */}
        <Box sx={{ marginTop: "auto" }}>
          <ProductActions />
        </Box>

      </CardContent>
    </Card>
  );
}

export default ProductCard;
