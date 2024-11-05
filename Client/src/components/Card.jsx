/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAddToCart from "../hooks/useAddToCart";
import { FaShoppingCart, FaTrashAlt, FaPencilAlt } from "react-icons/fa";


function Card({ product, isAdmin, onEdit, onDelete }) {
  const addToCart = useAddToCart();

  return (
    <div className="flex flex-col justify-between h-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {isAdmin ? (
        <div className="flex-1 flex flex-col">
          {/* Image */}
          <img
            src={`https://furnishop-api.onrender.com/productImages/${product.photo}`}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />

          {/* Product Info */}
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {product.description}
            </p>
            <p className="text-lg font-bold">Price:${product.price}</p>
            <p className="text-lg font-bold">Quantity:{product.quantity}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Image */}
          <Link to={`/product/${product._id}`}>
            <img
              src={`https://furnishop-api.onrender.com/productImages/${product.photo}`}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />

            {/* Product Info */}
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.description}
              </p>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Admin or User Controls */}
      <div className="p-4 bg-gray-50">
        {!isAdmin ? (
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 w-full flex gap-2 items-center justify-center"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              onClick={onEdit}
              className="flex gap-2 items-center justify-center bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 w-1/2 mr-2"
            >
              <FaPencilAlt />
              Edit
            </button>
            <button
              onClick={onDelete}
              className=" bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex gap-2 items-center justify-center"
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
