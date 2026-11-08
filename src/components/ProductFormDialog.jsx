
import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const emptyForm = {
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
};

export default function ProductFormDialog({
    open,
    product,
    onClose,
    onSave,
}) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            setForm(
                product
                    ? {
                          name: product.name ?? "",
                          price: String(product.price ?? ""),
                          category: product.category ?? "",
                          image: product.image ?? "",
                          description: product.description ?? "",
                      }
                    : { ...emptyForm }
            );

            setErrors({});
        }
    }, [open, product]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = {};
        const price = Number(form.price);

        if (!form.name.trim()) {
            nextErrors.name = "Product name is required.";
        }

        if (
            form.price.trim() === "" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            nextErrors.price = "Enter a valid price of zero or more.";
        }

        if (!form.category.trim()) {
            nextErrors.category = "Category is required.";
        }

        if (!form.description.trim()) {
            nextErrors.description = "Description is required.";
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        onSave({
            name: form.name.trim(),
            price,
            category: form.category.trim(),
            image:
                form.image.trim() ||
                "https://placehold.co/600x400?text=Product",
            description: form.description.trim(),
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit} noValidate>
                <DialogTitle>
                    {product ? "Edit Product" : "Add Product"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        fullWidth
                        label="Product Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        required
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Price (PHP)"
                        name="price"
                        type="number"
                        slotProps={{
                            htmlInput: { min: 0, step: "0.01" },
                        }}
                        value={form.price}
                        onChange={handleChange}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        required
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                        required
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Image URL (Optional)"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        multiline
                        minRows={3}
                        required
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>

                    <Button type="submit" variant="contained">
                        {product ? "Save Changes" : "Add Product"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
