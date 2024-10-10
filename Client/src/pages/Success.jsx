import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cart/cartSlice";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleHomeClick() {
    navigate("/");
    dispatch(clearCart());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Success!</h2>
        <p className="text-gray-700 mb-6">
          Transaction completed successfully.
        </p>
        <button
          onClick={handleHomeClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}
