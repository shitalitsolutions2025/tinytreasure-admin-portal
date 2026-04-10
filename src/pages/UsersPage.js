import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { API_BASE_URL } from "../utils/api";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("adminToken");

    const fetchUsers = async () => {
        const res = await fetch(`${API_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
    };

    const suspendUser = async (userId, status) => {
        await fetch(`${API_BASE_URL}/user/suspend/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ isSuspended: status }),
        });
        fetchUsers();
    };

    const deleteUser = async (userId) => {
        await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const userColumns = [
        { name: "Name", selector: (row) => row.name || "-" },
        { name: "Email", selector: (row) => row.email || "-" },
        { name: "Phone", selector: (row) => row.phone || "-" },
        { name: "Role", selector: (row) => row.role },
        {
            name: "Suspended",
            selector: (row) => (row.status === "suspended" ? "Yes" : "No"),
        },
        {
            name: "Actions",
            cell: (row) => (
                <>
                    <button
                        style={{ marginRight: 8 }}
                        onClick={() =>
                            suspendUser(row._id, row.status === "suspended" ? false : true)
                        }
                    >
                        {row.status === "suspended" ? "Unsuspend" : "Suspend"}
                    </button>
                    <button onClick={() => deleteUser(row._id)}>Delete</button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Users</h2>
            <DataTable
                title="Users"
                columns={userColumns}
                data={users}
                pagination
                highlightOnHover
                striped
                dense
            />
        </div>
    );
};

export default UsersPage;
