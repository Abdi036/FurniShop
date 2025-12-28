/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAddToCart from "../hooks/useAddToCart";
import { FaShoppingCart, FaTrashAlt, FaPencilAlt } from "react-icons/fa";

function Card({ product, isAdmin, onEdit, onDelete }) {
  const addToCart = useAddToCart();

  return (
    <div className="group flex flex-col justify-between h-full bg-white border border-gray-100 shadow-sm rounded-none overflow-hidden hover:shadow-2xl hover:border-gold/30 transition-all duration-500">
      {isAdmin ? (
        <div className="flex-1 flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden h-64">
            <img
              src={`https://furnishop-d6qb.onrender.com/productImages/${product.photo}`}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
          </div>

          {/* Product Info */}
          <div className="p-6 flex-grow flex flex-col items-center text-center">
            <h3 className="text-xl font-serif font-bold mb-2 text-primary group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-500 mb-4 line-clamp-2 font-light text-sm">
              {product.description}
            </p>
            <div className="mt-auto">
              <p className="text-2xl font-serif font-bold text-primary">
                ${product.price}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Quantity: {product.quantity}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Image */}
          <Link
            to={`/product/${product._id}`}
            className="block relative overflow-hidden h-64"
          >
            <img
              src={`https://furnishop-d6qb.onrender.com/productImages/${product.photo}`}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
          </Link>

          {/* Product Info */}
          <Link
            to={`/product/${product._id}`}
            className="p-6 flex-grow flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-serif font-bold mb-2 text-primary group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-500 mb-4 line-clamp-2 font-light text-sm">
              {product.description}
            </p>
            <p className="text-2xl font-serif font-bold text-primary mt-auto">
              ${product.price}
            </p>
          </Link>
        </div>
      )}

      {/* Admin or User Controls */}
      <div className="p-6 pt-0 bg-white">
        {!isAdmin ? (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-primary text-white font-medium py-3 px-4 uppercase tracking-wider hover:bg-gold hover:text-primary transition-all duration-300 flex gap-2 items-center justify-center border border-primary hover:border-gold"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        ) : (
          <div className="flex justify-between gap-4">
            <button
              onClick={onEdit}
              className="flex-1 flex gap-2 items-center justify-center bg-primary text-white font-medium py-2 px-4 hover:bg-gold hover:text-primary transition duration-300"
            >
              <FaPencilAlt />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-white text-accent border border-accent font-medium py-2 px-4 hover:bg-accent hover:text-white transition duration-300 flex gap-2 items-center justify-center"
            >
              <FaTrashAlt />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
