import React, { useState, useEffect } from 'react';
import { changeProductStatus } from '../api/changeProductStatus';
import { changeDonationProductStatus } from '../api/changeDonationProductStatus';

const ProductStatusManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend (this should be replaced with actual API call)
    const fetchProducts = async () => {
      try {
        // Replace with actual API call to fetch products
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleStatusChange = async (productId, newStatus) => {
    try {
      const result = await changeProductStatus(productId, newStatus);
      if (result.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, status: newStatus } : product
          )
        );
      } else {
        setError('Failed to change product status');
      }
    } catch (err) {
      setError('Error changing product status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Manage Product Statuses</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Status: {product.status}
            <button onClick={() => handleStatusChange(product.id, 'active')}>Activate</button>
            <button onClick={() => handleStatusChange(product.id, 'inactive')}>Deactivate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductStatusManager;