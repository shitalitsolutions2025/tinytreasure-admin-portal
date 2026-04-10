import React from "react";

const DashboardPage = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Welcome to the Admin Dashboard</h2>
            <p>
                Use the sidebar to manage <b>Users</b>, <b>Products</b>, <b>Donations</b>,
                and <b>Orders</b>.
            </p>

            {/* Example Stats Section */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div
                    style={{
                        flex: 1,
                        background: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Users</h3>
                    <p>120</p>
                </div>

                <div
                    style={{
                        flex: 1,
                        background: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Products</h3>
                    <p>85</p>
                </div>

                <div
                    style={{
                        flex: 1,
                        background: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Donations</h3>
                    <p>42</p>
                </div>

                <div
                    style={{
                        flex: 1,
                        background: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total Orders</h3>
                    <p>67</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
