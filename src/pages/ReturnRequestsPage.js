import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { API_BASE_URL } from "../utils/api";

const ReturnRequestsPage = () => {
    const [returns, setReturns] = useState([]);
    const token = localStorage.getItem("adminToken");

    const fetchReturns = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/returns`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setReturns(Array.isArray(data.returns) ? data.returns : []);
        } catch (err) {
            console.error("fetchReturns:", err);
            setReturns([]);
        }
    }, [token]);

    useEffect(() => {
        fetchReturns();
    }, [fetchReturns]);

    const updateReturn = async (id, status) => {
        try {
            await fetch(`${API_BASE_URL}/returns/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            fetchReturns();
        } catch (err) {
            console.error("updateReturn:", err);
            alert("Failed");
        }
    };

    const columns = [
        { name: "ID", selector: (r) => r._id, width: "140px" },
        { name: "Product", selector: (r) => r.product?.title || "N/A" },
        { name: "Buyer", selector: (r) => r.buyer?.name || "N/A" },
        { name: "Reason", selector: (r) => r.reason },
        { name: "Status", selector: (r) => r.status },
        {
            name: "Actions",
            cell: (r) => (
                <>
                    <button onClick={() => updateReturn(r._id, "approved")} style={{ marginRight: 8 }}>
                        Approve
                    </button>
                    <button onClick={() => updateReturn(r._id, "rejected")}>Reject</button>
                </>
            ),
            button: true,
        },
    ];

    return (
        <div style={{ padding: 16 }}>
            <h2>Return Requests</h2>
            <DataTable
                columns={columns}
                data={returns}
                pagination
                highlightOnHover
                striped
                dense
                noDataComponent="No return requests"
            />
        </div>
    );
};

export default ReturnRequestsPage;
