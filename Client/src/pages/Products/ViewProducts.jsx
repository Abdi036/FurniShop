/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export default function ViewProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/products/getAllProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(res.data.data.products);
      } catch (error) {
        console.error("There was an error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [token]);

  // Function to filter products based on searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDelete(productId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/products/deleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("There was an error deleting the product:", error);
    }
  }

  async function handleEdit(id) {
    navigate(`/editproduct/${id}`);
  }

  if (loading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  return (
    <>
      {filteredProducts.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-6">Product List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                onEdit={() => handleEdit(product._id)}
                onDelete={() => handleDelete(product._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-semibold p-5 h-10 flex items-center justify-center">
          <h1>There are no products available.</h1>
        </div>
      )}
    </>
  );
}
