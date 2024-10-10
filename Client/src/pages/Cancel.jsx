import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate("/cart");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Failed!</h2>
        <p className="text-gray-700 mb-6">Transaction Failed.</p>
        <button
          onClick={handleHomeClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
