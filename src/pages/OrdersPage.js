
import React, { useEffect, useState, useCallback } from "react";

import { API_BASE_URL } from "../utils/api";

import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20 });
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    const fetchOrders = useCallback(async (page = 1) => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders?page=${page}&limit=${meta.limit}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setOrders(Array.isArray(data.orders) ? data.orders : []);
            setMeta({ total: data.total || 0, page: data.page || 1, limit: data.limit || 20 });
        } catch (err) {
            console.error("fetchOrders:", err);
            setOrders([]);
        }
    }, [token, meta.limit]);

    useEffect(() => {
        fetchOrders(1);
    }, [fetchOrders]);

    const changeStatus = async (id, status) => {
        try {
            await fetch(`${API_BASE_URL}/orders/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            fetchOrders(meta.page);
        } catch (err) {
            console.error("changeStatus:", err);
            alert("Failed to update status");
        }
    };

    const columns = [
        { name: "Order ID", selector: (r) => r._id, sortable: true, width: "220px" },
        { name: "Product", selector: (r) => r.product?.title || r.productId || "N/A", sortable: true },
        { name: "Buyer", selector: (r) => r.buyer?.name || r.buyerId || "N/A", sortable: true },
        { name: "Amount", selector: (r) => `${r.amount} ${r.currency || "INR"}` },
        { name: "Method", selector: (r) => r.paymentMethod || "-" },
        { name: "Status", selector: (r) => r.status || "-" },
        {
            name: "Actions",
            cell: (r) => (
                <>
                    <button onClick={() => navigate(`/dashboard/orders/${r._id}`)} style={{ marginRight: 8 }}>
                        View
                    </button>
                    <button onClick={() => changeStatus(r._id, "shipped")} style={{ marginRight: 8 }}>
                        Ship
                    </button>
                    <button onClick={() => changeStatus(r._1d || r._id, "delivered")}>Deliver</button>
                </>
            ),
            button: true,
        },
    ];

    return (
        <div style={{ padding: 16 }}>
            <h2>Orders</h2>
            <DataTable
                columns={columns}
                data={orders}
                pagination
                paginationServer
                paginationTotalRows={meta.total}
                onChangePage={(p) => fetchOrders(p)}
                highlightOnHover
                striped
                dense
                noDataComponent="No orders found"
            />
        </div>
    );
};

export default OrdersPage;