import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import UpdateProfile from "./pages/UpdateProfile";

// Auth Pages
import ResetPassword from "./pages/Auth/ResetPassword";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword";

//product pages
import ProductDetail from "./pages/Products/ProductDetail";
import Kitchen from "./pages/Products/Kitchen";
import LivingRoom from "./pages/Products/LivingRoom";
import BedRoom from "./pages/Products/Bedroom";
import Office from "./pages/Products/Office";

// Admin pages
import Adminpage from "./pages/Admin/AdminPage";
import AddProducts from "./pages/Admin/AddProducts";
import EditProduct from "./pages/Admin/EditProduct";
import Users from "./pages/Admin/Users";

export default function App() {
  const router = createBrowserRouter([
    // ResetPassword route on its own
    {
      path: "/resetPassword/:token",
      element: (
        <ProtectedRoute>
          <ResetPassword />
        </ProtectedRoute>
      ),
    },
    {
      path: "/success",
      element: (
        <ProtectedRoute>
          <Success />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cancel",
      element: (
        <ProtectedRoute>
          <Cancel />
        </ProtectedRoute>
      ),
    },

    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: (
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/products/kitchen",
          element: <Kitchen />,
        },
        {
          path: "/products/living-room",
          element: <LivingRoom />,
        },
        {
          path: "/products/bedroom",
          element: <BedRoom />,
        },
        {
          path: "/products/office",
          element: <Office />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },

        {
          path: "/addproducts",
          element: (
            <ProtectedRoute>
              <AddProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/:link",
          element: (
            <ProtectedRoute>
              <Adminpage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/updatePassword",
          element: (
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "/updateProfile",
          element: (
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/editproduct/:id",
          element: (
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          ),
        },

        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
