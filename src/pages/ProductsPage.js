import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";

import { API_BASE_URL } from "../utils/api";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("adminToken");

    // Fetch products
    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/products`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            // Ensure data is an array
            if (Array.isArray(data)) setProducts(data);
            else if (Array.isArray(data.products)) setProducts(data.products);
            else setProducts([]);
        } catch (err) {
            console.error("Error fetching products:", err);
            setProducts([]);
        }
    }, [token]);

    // Delete product
    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const columns = [
        { name: "Title", selector: (row) => row.title, sortable: true },
        { name: "Category", selector: (row) => row.category, sortable: true },
        { name: "Price", selector: (row) => row.price, sortable: true },
        { name: "Status", selector: (row) => row.status, sortable: true },
        { name: "Seller", selector: (row) => row.sellBy?.name || "N/A" },
        {
            name: "Actions",
            cell: (row) => (
                <button onClick={() => deleteProduct(row._id)}>Delete</button>
            ),
        },
    ];

    return (
        <div>
            <h2>Products</h2>
            <DataTable
                columns={columns}
                data={products}
                pagination
                highlightOnHover
                striped
                dense
                noDataComponent="No products found"
            />
        </div>
    );
};

export default ProductsPage;
