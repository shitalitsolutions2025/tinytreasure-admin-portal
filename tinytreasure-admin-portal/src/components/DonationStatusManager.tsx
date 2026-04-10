import React, { useState, useEffect } from 'react';
import { changeDonationProductStatus } from '../api/changeDonationProductStatus';

const DonationStatusManager = () => {
  const [donationProducts, setDonationProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donation products from the backend (this should be replaced with actual API call)
    const fetchDonationProducts = async () => {
      try {
        // Placeholder for fetching donation products
        const response = await fetch('/api/donation-products'); // Adjust the endpoint as necessary
        const data = await response.json();
        setDonationProducts(data);
      } catch (err) {
        setError('Failed to fetch donation products');
      } finally {
        setLoading(false);
      }
    };

    fetchDonationProducts();
  }, []);

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await changeDonationProductStatus(productId, newStatus);
      setDonationProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (err) {
      setError('Failed to change donation product status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Manage Donation Product Statuses</h2>
      <ul>
        {donationProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name} - Status: {product.status}</span>
            <button onClick={() => handleStatusChange(product.id, 'approved')}>Approve</button>
            <button onClick={() => handleStatusChange(product.id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationStatusManager;