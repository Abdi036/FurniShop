import { loadStripe } from "@stripe/stripe-js";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cart/cartSlice";
import { useState } from "react";  

function Cart() {
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  async function makePayment() {
    setLoading(true); // Set loading to true when starting payment
    try {
      const stripe = await loadStripe(
        "pk_test_51Q4g1rHPV8dRqPYiZzP1tNgVVQqlpKFCcvQyQHiazWoCHiSvABuwlCJly6OlwhqxmUwtRBwyvNaxC75ycFqYGRJ500RKUCWvnF"
      );

      const response = await fetch(
        "https://furnishop-api.onrender.com/api/v1/payment/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: cart,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          console.log(result.error.message);
        }
      } else {
        console.log("Failed to create session");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false); // Set loading to false after processing payment
    }
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-8">
      <button className="text-blue-500" onClick={() => navigate(-1)}>
        &lArr; Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={`https://furnishop-api.onrender.com/productImages/${item.photo}`}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 px-2 py-1">
                    {item.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 px-2">
                    ${item.price}
                  </p>
                  <div className="flex py-2">
                    <button
                      className="flex items-center justify-center bg-gray-300 w-10 h-10 rounded-full text-black px-4 py-2 transition duration-300 hover:bg-gray-400"
                      onClick={() => handleIncreaseQuantity(item.productId)}
                    >
                      +
                    </button>
                    <p className="text-gray-600 p-3">
                      Quantity: {item.quantity}
                    </p>
                    <button
                      className="flex items-center justify-center bg-gray-300 text-black px-4 py-2 w-10 h-10 rounded-full transition duration-300 hover:bg-gray-400"
                      onClick={() => handleDecreaseQuantity(item.productId)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="p-3 bg-red-500 text-white flex justify-center items-center rounded-xl gap-2"
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                <FaTrashAlt />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-bold">Total Price</h3>
        <p className="text-4xl font-extrabold mt-2">${totalPrice.toFixed(2)}</p>
        {totalPrice > 0 && (
          <button
            className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
            onClick={() => makePayment()}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="text-center font-semibold text-white" disabled>
                Loading...
              </div>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
