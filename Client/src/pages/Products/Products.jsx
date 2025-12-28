import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaSearch } from "react-icons/fa";
import { fetchProducts, deleteProduct } from "../../redux/products/productSlice";
import Loading from "../../components/Loading";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, status } = useSelector((state) => state.products);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct({ id, token }));
    }
  };

  if (status === "loading") return <Loading />;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-primary border-b-2 border-gold pb-2">
          Product Management
        </h1>
        <button
          onClick={() => navigate("/admin/addproducts")}
          className="bg-gold text-primary font-bold py-2 px-6 rounded-none hover:bg-primary hover:text-gold transition-all duration-300 shadow-md flex items-center gap-2"
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 pl-10 bg-white border border-gray-300 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white uppercase text-sm leading-normal">
                <th className="py-4 px-6 font-serif tracking-wider">Image</th>
                <th className="py-4 px-6 font-serif tracking-wider">Name</th>
                <th className="py-4 px-6 font-serif tracking-wider">Category</th>
                <th className="py-4 px-6 font-serif tracking-wider">Price</th>
                <th className="py-4 px-6 font-serif tracking-wider">Stock</th>
                <th className="py-4 px-6 font-serif tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                            src={`https://furnishop-d6qb.onrender.com/productImages/${product.photo}`}
                            alt={product.name}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className="font-medium text-primary text-base">
                        {product.name}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs uppercase tracking-wide font-bold">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left font-bold text-primary">
                      ${product.price}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`${
                          product.quantity > 0
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                        } py-1 px-3 rounded-full text-xs font-bold`}
                      >
                        {product.quantity > 0 ? product.quantity : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center gap-4">
                        <button
                          onClick={() => navigate(`/editproduct/${product._id}`)}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
