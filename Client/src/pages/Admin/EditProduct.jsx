import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/products/getProduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProduct(res.data.data.product);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the product:", error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:5000/api/v1/products/updateProduct/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/admin/products");
    } catch (error) {
      console.error("There was an error updating the product:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading product...</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <button className="text-blue-500 p-4" onClick={() => navigate(-1)}>
        &lArr; Back
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* You can add more fields here as needed */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
