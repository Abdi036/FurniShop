import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

export default function Users() {
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/getAllusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data.users);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch users");
      }
    }

    fetchUsers();
  }, [token]);

  async function handleDeleteUser(userId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/users/deleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove user from the state
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete user");
    }
  }

  // Filter users based on the search input (name)
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    if (user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (user._id.includes(searchQuery)) {
      return user._id.includes(searchQuery);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="p-3 flex items-center justify-center gap-1">
        {/* Search input for filtering by name */}
        <span className="font-semibold">Search:</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {message && (
        <div className="text-center mb-4 text-red-500">{message}</div>
      )}

      <div className="overflow-x-auto h-[63vh] overflow-y-auto">
        <div className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="w-full bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-gray-600 hidden md:table-cell">
                  No.
                </th>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600 hidden md:table-cell">
                  ID
                </th>
                <th className="py-2 px-4 text-left text-gray-600 hidden md:table-cell">
                  Email
                </th>
                <th className="py-2 px-4 text-left text-gray-600 hidden md:table-cell">
                  Role
                </th>
                <th className="py-2 px-4 text-left text-gray-600 hidden md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-gray-800">{user.name}</td>
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">
                    {user._id}
                  </td>
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 text-gray-800 text-right hidden md:table-cell">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className={`px-4 py-2 rounded flex items-center justify-center gap-1 ${
                        user.role === "user"
                          ? "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={user.role !== "user"} // Disable button if the role is not 'user'
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </td>
                  <td className="md:hidden py-2 px-4 text-gray-800 text-right">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className={`px-4 py-2 rounded ${
                        user.role === "user"
                          ? "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={user.role !== "user"} // Disable button if the role is not 'user'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
