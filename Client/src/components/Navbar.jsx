import { useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaTrashAlt,
  FaEdit,
  FaSignOutAlt,
  FaCouch,
  FaBed,
  FaUtensils,
  FaBriefcase,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";

import { logout } from "../redux/auth/authSlice";
import { useDeleteMyProfile } from "../hooks/useDeleteProfile";
import { clearCart } from "../redux/cart/cartSlice";

export default function Navbar() {
  const deleteMyProfile = useDeleteMyProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { link } = useParams();

  // Getting User Info
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user?.name);
  const userPhoto = useSelector((state) => state.auth.user?.photo);
  const isAdmin = useSelector((state) => state.auth.user?.role) === "admin";

  // Getting cart info
  const cart = useSelector((state) => state.cart);
  function handleLogout() {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  }

  async function handleDeleteAccount() {
    try {
      await deleteMyProfile();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isActiveLink = "underline underline-offset-4 decoration-black";

  // Construct URL for the profile photo
  const profilePhotoUrl = userPhoto
    ? `https://furnishop-d6qb.onrender.com/userImages/${userPhoto}`
    : "Unknown_person.jpg";

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:gap-60 sm:items-stretch sm:justify-start">
            {!isAdmin && (
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="hidden sm:block text-black text-2xl font-extrabold tracking-wide"
                >
                  FurniShop
                </Link>
              </div>
            )}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {
                  <>
                    {isAuthenticated && isAdmin ? (
                      <Link
                        to={`/admin/:${link}`}
                        className="text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                      >
                        Admin
                      </Link>
                    ) : (
                      <>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center gap-1 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200`
                              : " flex items-center gap-1 text-black px-3 py-2 rounded-md text-sm font-simebold hover:bg-gray-200"
                          }
                        >
                          <FaHome />
                          Home
                        </NavLink>
                        <NavLink
                          to="/products/living-room"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200`
                              : " flex items-center text-black px-3 py-2 rounded-md text-sm font-simebold hover:bg-gray-200"
                          }
                        >
                          <FaCouch className="mr-1" />
                          Living Room
                        </NavLink>
                        <NavLink
                          to="/products/bedroom"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200`
                              : " flex items-center text-black px-3 py-2 rounded-md text-sm font-simebold hover:bg-gray-200"
                          }
                        >
                          <FaBed className="mr-1" />
                          Bedroom
                        </NavLink>
                        <NavLink
                          to="/products/kitchen"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200`
                              : " flex items-center text-black px-3 py-2 rounded-md text-sm font-simebold hover:bg-gray-200"
                          }
                        >
                          <FaUtensils className="mr-1" />
                          Kitchen
                        </NavLink>
                        <NavLink
                          to="/products/office"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200`
                              : " flex items-center text-black px-3 py-2 rounded-md text-sm font-simebold hover:bg-gray-200"
                          }
                        >
                          <FaBriefcase className="mr-1" />
                          Office
                        </NavLink>
                      </>
                    )}
                  </>
                }
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <div className="text-black mr-3">{userName}</div>
                <div className="relative">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      onClick={toggleMenu}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profilePhotoUrl}
                        alt="Profile"
                      />
                    </button>
                    {!isAdmin && (
                      <Link
                        to="/cart"
                        className="flex items-center text-black px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                        onClick={toggleMobileMenu}
                      >
                        <div className="flex items-center justify-center">
                          <span className="text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center font-semibold absolute top-[-4%] ml-4">
                            {cart.cartItems.length}
                          </span>
                          <FaShoppingCart className="mr-1 text-2xl" />
                        </div>
                      </Link>
                    )}
                  </div>
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Link
                          to="/updateProfile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          <FaEdit className="mr-2" />
                          Update Profile
                        </Link>
                        <Link
                          to="/updatePassword"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggleMenu}
                        >
                          <FaEdit className="mr-2" />
                          Update Password
                        </Link>
                        <Link
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleDeleteAccount}
                        >
                          <FaTrashAlt className="mr-2" />
                          Delete Profile
                        </Link>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            toggleMenu();
                            handleLogout();
                          }}
                        >
                          <FaSignOutAlt className="mr-2" />
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 font-light text-slate-800 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 font-light text-slate-800 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-black block px-3 py-2 rounded-md text-base font-simebold hover:bg-gray-200"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                {isAdmin ? (
                  <Link
                    to={`/admin/:${link}`}
                    className="text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                    onClick={toggleMobileMenu}
                  >
                    Admin
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/products/living-room"
                      className="flex items-center text-black  px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
                      onClick={toggleMobileMenu}
                    >
                      <FaCouch className="mr-1" />
                      Living Room
                    </Link>
                    <Link
                      to="/products/bedroom"
                      className="flex items-center text-black  px-3 py-2 rounded-md text-base font-simebold hover:bg-gray-200"
                      onClick={toggleMobileMenu}
                    >
                      <FaBed className="mr-1" />
                      Bedroom
                    </Link>
                    <Link
                      to="/products/kitchen"
                      className="flex items-center text-black  px-3 py-2 rounded-md text-base font-simebold hover:bg-gray-200"
                      onClick={toggleMobileMenu}
                    >
                      <FaUtensils className="mr-1" />
                      Kitchen
                    </Link>
                    <Link
                      to="/products/office"
                      className="flex items-center text-black  px-3 py-2 rounded-md text-base font-simebold hover:bg-gray-200"
                      onClick={toggleMobileMenu}
                    >
                      <FaBriefcase className="mr-1" />
                      Office
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
