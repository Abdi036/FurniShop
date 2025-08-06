import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useAddToCart from "../../hooks/useAddToCart";
import { FaSpinner } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const addTocart = useAddToCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://furnishop-d6qb.onrender.com/api/v1/products/getAllProducts",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  const product = products.find((product) => product._id === id);

  // Check if the product is found
  if (!product) {
    return (
      <div className="my-10 w-full px-4 md:px-6 lg:px-8">
        <button className="text-blue-500 p-4" onClick={() => navigate(-1)}>
          &lArr; Back
        </button>
        <div className="text-center text-red-500 text-lg font-bold">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 w-full px-4 md:px-6 lg:px-8">
      <button className="text-blue-500 p-4" onClick={() => navigate(-1)}>
        &lArr; Back
      </button>
      <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={`https://furnishop-d6qb.onrender.com/productImages/${product.photo}`}
            alt={product.name}
            className="w-full lg:w-1/2 h-auto object-cover rounded-md mb-4 lg:mb-0 lg:mr-6 shadow-lg"
          />
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h2>
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price}
            </p>
            <button
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
              onClick={() => addTocart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
