import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Success = lazy(() => import("./pages/Success"));
const Cancel = lazy(() => import("./pages/Cancel"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));

// Auth Pages
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const UpdatePassword = lazy(() => import("./pages/Auth/UpdatePassword"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));

//product pages
const ProductDetail = lazy(() => import("./pages/Products/ProductDetail"));
const Kitchen = lazy(() => import("./pages/Products/Kitchen"));
const LivingRoom = lazy(() => import("./pages/Products/LivingRoom"));
const BedRoom = lazy(() => import("./pages/Products/Bedroom"));
const Office = lazy(() => import("./pages/Products/Office"));

// Admin pages
const Adminpage = lazy(() => import("./pages/Admin/AdminPage"));
const AddProducts = lazy(() => import("./pages/Admin/AddProducts"));
const EditProduct = lazy(() => import("./pages/Admin/EditProduct"));
const Users = lazy(() => import("./pages/Admin/Users"));
const EmailVerified = lazy(() => import("./pages/EmailVerified"));

export default function App() {
  const router = createBrowserRouter([
    // ResetPassword route on its own
    {
      path: "/resetPassword/:token",
      element: (
        <Suspense fallback={<Loading />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "/success",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <Success />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "/cancel",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <Cancel />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "/email-verified",
      element: (
        <Suspense fallback={<Loading />}>
          <EmailVerified />
        </Suspense>
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
          path: "/updateProfile",
          element: (
            <ProtectedRoute>
              <UpdateProfile />
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
          path: "/admin/:link?",
          element: (
            <ProtectedRoute>
              <Adminpage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/addproduct",
          element: (
            <ProtectedRoute>
              <AddProducts />
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
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loading />}>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/forgotPassword",
      element: (
        <Suspense fallback={<Loading />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
