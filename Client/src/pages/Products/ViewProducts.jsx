/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import {
  fetchProducts,
  deleteProduct,
} from "../../redux/products/productSlice";
import Loading from "../../components/Loading";

export default function ViewProducts({ searchTerm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products, status } = useSelector((state) => state.products);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Filter products based on searchTerm (Client-side filtering)
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
    dispatch(deleteProduct({ id: productId, token }));
  }

  async function handleEdit(id) {
    navigate(`/editproduct/${id}`);
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return (
      <div className="text-center text-red-500">Error loading products.</div>
    );
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
