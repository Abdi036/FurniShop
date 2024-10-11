import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

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

  const [message, setMessage] = useState(null);

  const { name, email, photo } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleFileChange(e) {
    setFormData({ ...formData, photo: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Creating a FormData object to handle file uploads
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    if (photo) {
      form.append("photo", photo);
    }

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/users/updateMyAccount",
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
      // navigate(`${isAdmin}` ? "/admin/users" : "/");
      if (isAdmin) {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">Update Profile</h2>
      {message && (
        <div className="text-center mb-4 text-red-500">{message}</div>
      )}
      <form onSubmit={handleSubmit}>
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
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
