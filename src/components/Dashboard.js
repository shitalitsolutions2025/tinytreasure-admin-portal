import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { API_BASE_URL } from "../utils/api";

// Sidebar menu component
const Sidebar = ({ setActiveModule, activeModule }) => {
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
        {["dashboard", "users", "products", "donations", "orders"].map((module) => (
          <li key={module} style={{ marginBottom: 10 }}>
            <button
              onClick={() => setActiveModule(module)}
              style={{
                width: "100%",
                padding: "8px",
                background: activeModule === module ? "#007bff" : "#e0e0e0",
                color: activeModule === module ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
              }}
            >
              {module.charAt(0).toUpperCase() + module.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [donationProducts, setDonationProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeModule, setActiveModule] = useState("dashboard");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/login");
    fetchProducts();
    fetchDonationProducts();
  }, [navigate]);

  // Fetch Products
  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE_URL}/products?admin=true`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
  };

  // Fetch Donation Products
  const fetchDonationProducts = async () => {
    const res = await fetch(`${API_BASE_URL}/donations?admin=true`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDonationProducts(data);
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      console.log("token : ", token);
      const res = await fetch(`${API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]); // fallback
    }
  };

  // Change product/donation status
  const changeStatus = async (id, status, type) => {
    const url =
      type === "donation"
        ? `${API_BASE_URL}/donations/change-status/${id}`
        : `${API_BASE_URL}/products/change-status/${id}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id, status }),
    });
    fetchProducts();
    fetchDonationProducts();
  };

  // Suspend or delete user
  const suspendUser = async (userId, status) => {
    await fetch(`${API_BASE_URL}/user/suspend/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",   // ✅ important
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isSuspended: status }),  // ✅ send status
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

  // Columns
  const productColumns = [
    { name: "ID", selector: (row) => row._id, sortable: true, width: "120px" },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description },
    { name: "Price", selector: (row) => row.price },
    { name: "Category", selector: (row) => row.category },
    { name: "Condition", selector: (row) => row.condition },
    {
      name: "Sell By",
      selector: (row) =>
        row.sellBy && typeof row.sellBy === "object"
          ? row.sellBy.name || row.sellBy.email || row.sellBy._id
          : row.sellBy,
    },
    {
      name: "Photos",
      cell: (row) =>
        row.photos && row.photos.length > 0 ? (
          row.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt="Product"
              width={40}
              style={{ marginRight: 4 }}
            />
          ))
        ) : (
          "No Photo"
        ),
    },
    { name: "Status", selector: (row) => row.status },
    { name: "Views", selector: (row) => row.views },
    {
      name: "Change Status",
      cell: (row) =>
        row.status === "pending" || row.status === "pendingApproval" ? (
          <>
            <button onClick={() => changeStatus(row._id, "approved", "normal")}>
              Approve
            </button>
            <button onClick={() => changeStatus(row._id, "rejected", "normal")}>
              Reject
            </button>
          </>
        ) : (
          row.status
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const donationColumns = [
    { name: "ID", selector: (row) => row._id, sortable: true, width: "120px" },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description },
    { name: "Category", selector: (row) => row.category },
    { name: "Condition", selector: (row) => row.condition },
    {
      name: "Photos",
      cell: (row) =>
        row.photos && row.photos.length > 0 ? (
          row.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt="Donation"
              width={40}
              style={{ marginRight: 4 }}
            />
          ))
        ) : (
          "No Photo"
        ),
    },
    {
      name: "Donated By",
      selector: (row) =>
        row.donatedBy && typeof row.donatedBy === "object"
          ? row.donatedBy.name || row.donatedBy.email || row.donatedBy._id
          : row.donatedBy,
    },
    { name: "Status", selector: (row) => row.status },
    { name: "Views", selector: (row) => row.views },
    {
      name: "Change Status",
      cell: (row) =>
        row.status === "pending" || row.status === "pendingApproval" ? (
          <>
            <button onClick={() => changeStatus(row._id, "approved", "donation")}>
              Approve
            </button>
            <button onClick={() => changeStatus(row._id, "rejected", "donation")}>
              Reject
            </button>
          </>
        ) : (
          row.status
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Fetch users whenever activeModule changes to "users"
  useEffect(() => {
    if (activeModule === "users") {
      fetchUsers();
    }
  }, [activeModule]);

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
            onClick={() => suspendUser(row._id, row.status === "suspended" ? false : true)}
          >
            {row.status === "suspended" ? "Unsuspend" : "Suspend"}
          </button>
          <button onClick={() => deleteUser(row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div style={{ flex: 1, padding: 20 }}>
        {activeModule === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}

        {activeModule === "users" && (
          <DataTable
            title="Users"
            columns={userColumns}
            data={users || []}
            pagination
            highlightOnHover
            striped
            dense
          />
        )}

        {activeModule === "products" && (
          <DataTable
            title="Products"
            columns={productColumns}
            data={products}
            pagination
            highlightOnHover
            striped
            dense
          />
        )}

        {activeModule === "donations" && (
          <DataTable
            title="Donation Products"
            columns={donationColumns}
            data={donationProducts}
            pagination
            highlightOnHover
            striped
            dense
          />
        )}

        {activeModule === "orders" && <h2>Order Management Coming Soon</h2>}
      </div>
    </div>
  );
};

export default Dashboard;
