import { FaShoppingCart, FaUser, FaClock, FaTruck, FaDollarSign } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  // Mock Data for Charts
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 7000 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 8000 },
  ];

  const categoryData = [
    { name: "Living Room", value: 400 },
    { name: "Bedroom", value: 300 },
    { name: "Kitchen", value: 300 },
    { name: "Office", value: 200 },
  ];

  const COLORS = ["#0F172A", "#D4AF37", "#8B0000", "#1E293B"];

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      icon: <FaDollarSign className="text-3xl text-gold" />,
      bg: "bg-primary",
      text: "text-white",
    },
    {
      title: "Total Orders",
      value: "124",
      icon: <FaShoppingCart className="text-3xl text-primary" />,
      bg: "bg-white",
      text: "text-primary",
    },
    {
      title: "Total Users",
      value: "45",
      icon: <FaUser className="text-3xl text-primary" />,
      bg: "bg-white",
      text: "text-primary",
    },
    {
      title: "Pending Orders",
      value: "5",
      icon: <FaClock className="text-3xl text-accent" />,
      bg: "bg-white",
      text: "text-primary",
    },
  ];

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-serif font-bold mb-8 text-primary border-b-2 border-gold inline-block pb-2">
        Executive Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} ${stat.text} shadow-lg rounded-none border border-gold/20 p-6 flex items-center justify-between transition-transform hover:-translate-y-1 duration-300`}
          >
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wider opacity-80">
                {stat.title}
              </h2>
              <p className="text-3xl font-serif font-bold mt-2">{stat.value}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-100/10 border border-gold/30">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-serif font-bold mb-6 text-primary">
            Revenue Overview
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#0F172A" />
                <YAxis stroke="#0F172A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    color: "#fff",
                    border: "1px solid #D4AF37",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{ fill: "#0F172A", stroke: "#D4AF37", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-serif font-bold mb-6 text-primary">
            Sales by Category
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
