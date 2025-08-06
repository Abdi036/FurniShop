import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function UpdateProfile() {
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    photo: null,
  });
  const userPhoto = useSelector((state) => state.auth.user?.photo);

  const profilePhotoUrl = userPhoto
    ? `https://furnishop-d6qb.onrender.com/userImages/${userPhoto}`
    : "Unknown_person.jpg";

  const [photoPreview, setPhotoPreview] = useState(profilePhotoUrl || null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const { name, email, photo } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    if (photo) {
      form.append("photo", photo);
    }

    try {
      const res = await axios.patch(
        "https://furnishop-d6qb.onrender.com/api/v1/users/updateMyAccount",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(updateUser(res.data.data.user));
      alert("Profile updated successfully ✨✨✨");
      setLoading(false); // Stop loading
      if (isAdmin) {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">Update Profile</h2>
      {message && (
        <div className="text-center mb-4 text-red-500">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-center">
          <div
            className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Click to upload
              </div>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
