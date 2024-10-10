import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cart/cartSlice";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function handleAddToCart(product) {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
    }
  }

  return handleAddToCart;
}
