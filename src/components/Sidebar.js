import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Users", path: "/dashboard/users" },
        { label: "Products", path: "/dashboard/products" },
        { label: "Donations", path: "/dashboard/donations" },
        { label: "Orders", path: "/dashboard/orders" },
        { label: "Return Requests", path: "/dashboard/returns" },
    ];

    return (
        <div
            style={{
                width: 200,
                minHeight: "100vh",
                background: "#f0f0f0",
                padding: 20,
                float: "left",
            }}
        >
            <h3>Admin Panel</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {menuItems.map((item) => (
                    <li key={item.path} style={{ marginBottom: 10 }}>
                        <Link to={item.path}>
                            <button
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    background:
                                        location.pathname === item.path ? "#007bff" : "#e0e0e0",
                                    color: location.pathname === item.path ? "#fff" : "#000",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                {item.label}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
