import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // remove token
        navigate("/login"); // redirect to login
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#007bff",
                color: "#fff",
                padding: "10px 20px",
            }}
        >
            <h2 style={{ margin: 0 }}>Admin Panel</h2>
            <div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "6px 12px",
                        background: "#dc3545",
                        border: "none",
                        borderRadius: "4px",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
