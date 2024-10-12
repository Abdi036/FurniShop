import { FaShoppingCart, FaUser, FaClock, FaTruck } from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "7",
      icon: <FaShoppingCart className="text-4xl text-blue-500" />,
    },
    {
      title: "Total Users",
      value: "2",
      icon: <FaUser className="text-4xl text-green-500" />,
    },
    {
      title: "Pending Orders",
      value: "5",
      icon: <FaClock className="text-4xl text-yellow-500" />,
    },
    {
      title: "Shipped",
      value: "2",
      icon: <FaTruck className="text-4xl text-green-400" />,
    },
  ];

  return (
    <div className="container mx-auto p-6 h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center"
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
