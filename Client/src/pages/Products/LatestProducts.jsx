import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../../components/Card";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const filteredProducts = products.filter(
    (product) => product.price > 700 && product.price < 1000
  );

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
    return <div className="text-center text-lg">Loading products...</div>;
  }

  return (
    <div className="my-10 w-full px-4 md:px-6 lg:px-8">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-slate-300 p-2">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
