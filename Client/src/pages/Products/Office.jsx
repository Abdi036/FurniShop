import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card"; // Importing the Card component
import { FaSpinner } from "react-icons/fa";

export default function Office() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  // Filter products to only show those in the "office" category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === "office"
  );

  // Fetch all products when the component mounts
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lg text-slate-800 sm:text-2xl p-2 mb-3 font-bold border-b-2 border-black">
        Office Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {filteredProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
