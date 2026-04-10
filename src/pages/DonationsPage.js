import React, { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";

import { API_BASE_URL } from "../utils/api";

const DonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const token = localStorage.getItem("adminToken"); // Make sure token key matches

    // Fetch donations
    const fetchDonations = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/donations`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            // Ensure data is array
            if (Array.isArray(data)) setDonations(data);
            else if (Array.isArray(data.donations)) setDonations(data.donations);
            else setDonations([]);
        } catch (err) {
            console.error("Error fetching donations:", err);
            setDonations([]);
        }
    }, [token]);

    // Delete donation
    const deleteDonation = async (id) => {
        if (!window.confirm("Are you sure you want to delete this donation?")) return;
        try {
            await fetch(`${API_BASE_URL}/donations/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchDonations();
        } catch (err) {
            console.error("Error deleting donation:", err);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const columns = [
        { name: "Title", selector: (row) => row.title, sortable: true },
        { name: "Category", selector: (row) => row.category, sortable: true },
        { name: "Status", selector: (row) => row.status, sortable: true },
        { name: "Donor", selector: (row) => row.donatedBy?.name || "N/A" },
        {
            name: "Actions",
            cell: (row) => (
                <button onClick={() => deleteDonation(row._id)}>Delete</button>
            ),
        },
    ];

    return (
        <div>
            <h2>Donations</h2>
            <DataTable
                columns={columns}
                data={donations}
                pagination
                highlightOnHover
                striped
                dense
                noDataComponent="No donations found"
            />
        </div>
    );
};

export default DonationsPage;
