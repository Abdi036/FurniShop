import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUsers, FaBox, FaChartBar, FaDashcube } from "react-icons/fa";

import Products from "../Products/Products";
import Users from "./Users";
import AddProducts from "./AddProducts";
import Dashboard from "./Dashboard";
import Orders from "./Orders";

export default function Adminpage() {
  const [activeSection, setActiveSection] = useState("users");
  const navigate = useNavigate();
  const { link } = useParams();

  useEffect(() => {
    if (!link) {
      navigate("/admin/users");
      return;
    }
    switch (link) {
      case "users":
        setActiveSection("users");
        break;
      case "addproducts":
        setActiveSection("addproducts");
        break;
      case "products":
        setActiveSection("products");
        break;
      case "orders":
        setActiveSection("orders");
        break;
      case "dashboard":
        setActiveSection("dashboard");
        break;
      default:
        setActiveSection("users");
        navigate("/admin/users");
    }
  }, [link, navigate]);

  return (
    <div className="grid grid-cols-4 h-auto bg-gray-100">
      {/* Sidebar */}
      <div className="col-span-1 fixed h-full w-[22%] bg-gray-800 text-white ">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          Administrator
        </div>
        <div className="mt-4 overflow-y-auto">
          <nav>
            <ul>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
                    activeSection === "users" ? "bg-gray-900" : ""
                  }`}
                  onClick={() => setActiveSection("users")}
                >
                  <FaUsers className="mr-3" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/addproducts"
                  className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
                    activeSection === "addproducts" ? "bg-gray-900" : ""
                  }`}
                  onClick={() => setActiveSection("addproducts")}
                >
                  <FaBox className="mr-3" />
                  AddProducts
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
                    activeSection === "products" ? "bg-gray-900" : ""
                  }`}
                  onClick={() => setActiveSection("products")}
                >
                  <FaChartBar className="mr-3" />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
                    activeSection === "orders" ? "bg-gray-900" : ""
                  }`}
                  onClick={() => setActiveSection("orders")}
                >
                  <FaChartBar className="mr-3" />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center px-4 py-2 text-sm font-medium hover:bg-gray-700 ${
                    activeSection === "dashboard" ? "bg-gray-900" : ""
                  }`}
                  onClick={() => setActiveSection("dashboard")}
                >
                  <FaDashcube className="mr-3" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-3 ml-80 p-4 w-[100%]">
        <>
          {activeSection === "users" && <Users />}
          {activeSection === "addproducts" && <AddProducts />}
          {activeSection === "products" && <Products />}
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "orders" && <Orders />}
        </>
      </div>
    </div>
  );
}
