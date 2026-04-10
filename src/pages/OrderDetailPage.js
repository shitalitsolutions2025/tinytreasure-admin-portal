import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("adminToken");
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");

    const fetchOrder = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setOrder(data);
            setStatus(data.status || "");
        } catch (err) {
            console.error("fetchOrder:", err);
        }
    };

    useEffect(() => {
        fetchOrder();
        // eslint-disable-next-line
    }, [id]);

    const saveStatus = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error("failed");
            const updated = await res.json();
            setOrder(updated);
            alert("Status updated");
        } catch (err) {
            console.error("saveStatus:", err);
            alert("Update failed");
        }
    };

    if (!order) return <div style={{ padding: 16 }}>Loading...</div>;

    return (
        <div style={{ padding: 16 }}>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>Order {order._id}</h2>

            <div style={{ marginTop: 12 }}>
                <b>Product:</b> {order.product?.title || order.productId}
            </div>
            <div>
                <b>Buyer:</b> {order.buyer?.name || order.buyerId} ({order.buyer?.email || "-"})
            </div>
            <div>
                <b>Amount:</b> {order.amount} {order.currency || "INR"}
            </div>
            <div>
                <b>Payment Method:</b> {order.paymentMethod}
            </div>
            <div>
                <b>Shipping Address:</b>{" "}
                {order.shippingAddress
                    ? `${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`
                    : "N/A"}
            </div>

            <div style={{ marginTop: 12 }}>
                <label>
                    <b>Change Status:</b>{" "}
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="success">success</option>
                        <option value="failed">failed</option>
                        <option value="refunded">refunded</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                    </select>
                </label>
                <button onClick={saveStatus} style={{ marginLeft: 8 }}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default OrderDetailPage;
