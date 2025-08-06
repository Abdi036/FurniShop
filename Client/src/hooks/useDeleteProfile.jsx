import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

export function useDeleteMyProfile() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteMyProfile = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        "https://furnishop-d6qb.onrender.com/api/v1/users/deleteMyAccount",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(logout());
      isConfirmed &&
        (alert("Your account has been deleted successfully."),
        navigate("/signup"));
      return response.data;
    } catch (error) {
      console.error("Error deleting account:", error.response.data);
      throw error.response.data;
    }
  };

  return deleteMyProfile;
}
