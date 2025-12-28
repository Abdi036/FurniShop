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

  const isActiveLink = "text-gold border-b-2 border-gold";

  // Construct URL for the profile photo
  const profilePhotoUrl = userPhoto
    ? `https://furnishop-d6qb.onrender.com/userImages/${userPhoto}`
    : "Unknown_person.jpg";

  return (
    <nav className="bg-primary border-b border-gold/20 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gold hover:text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold"
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
          <div className="flex-1 flex items-center justify-center sm:gap-10 sm:items-stretch sm:justify-start">
            {!isAdmin && (
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="hidden sm:block text-gold text-3xl font-serif font-bold tracking-wider hover:text-gold-light transition-colors"
                >
                  FurniShop
                </Link>
              </div>
            )}
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex space-x-8 items-center h-full">
                {
                  <>
                    {isAuthenticated && isAdmin ? (
                      <Link
                        to="/admin"
                        className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-gold transition-colors"
                      >
                        Admin
                      </Link>
                    ) : (
                      <>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all`
                              : "flex items-center gap-1 text-gray-300 px-3 py-2 text-sm font-medium hover:text-gold transition-all"
                          }
                        >
                          <FaHome />
                          Home
                        </NavLink>
                        <NavLink
                          to="/products/living-room"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center px-3 py-2 text-sm font-medium transition-all`
                              : "flex items-center text-gray-300 px-3 py-2 text-sm font-medium hover:text-gold transition-all"
                          }
                        >
                          <FaCouch className="mr-1" />
                          Living Room
                        </NavLink>
                        <NavLink
                          to="/products/bedroom"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center px-3 py-2 text-sm font-medium transition-all`
                              : "flex items-center text-gray-300 px-3 py-2 text-sm font-medium hover:text-gold transition-all"
                          }
                        >
                          <FaBed className="mr-1" />
                          Bedroom
                        </NavLink>
                        <NavLink
                          to="/products/kitchen"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center px-3 py-2 text-sm font-medium transition-all`
                              : "flex items-center text-gray-300 px-3 py-2 text-sm font-medium hover:text-gold transition-all"
                          }
                        >
                          <FaUtensils className="mr-1" />
                          Kitchen
                        </NavLink>
                        <NavLink
                          to="/products/office"
                          className={({ isActive }) =>
                            isActive
                              ? `${isActiveLink} flex items-center px-3 py-2 text-sm font-medium transition-all`
                              : "flex items-center text-gray-300 px-3 py-2 text-sm font-medium hover:text-gold transition-all"
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

          <div className="flex items-center ml-4">
            {isAuthenticated ? (
              <>
                <div className="text-gold mr-4 font-serif hidden md:block">
                  {userName}
                </div>
                <div className="relative">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      className="bg-primary-light flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold border-2 border-gold"
                      onClick={toggleMenu}
                    >
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={profilePhotoUrl}
                        alt="Profile"
                      />
                    </button>
                    {!isAdmin && (
                      <Link
                        to="/cart"
                        className="flex items-center text-gold px-3 py-2 rounded-md text-base font-medium hover:text-white transition-colors relative"
                        onClick={toggleMobileMenu}
                      >
                        <div className="flex items-center justify-center">
                          {cart.cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                              {cart.cartItems.length}
                            </span>
                          )}
                          <FaShoppingCart className="text-2xl" />
                        </div>
                      </Link>
                    )}
                  </div>
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <Link
                          to="/updateProfile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          onClick={toggleMenu}
                        >
                          <FaEdit className="mr-2 text-gold" />
                          Update Profile
                        </Link>
                        <Link
                          to="/updatePassword"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          onClick={toggleMenu}
                        >
                          <FaEdit className="mr-2 text-gold" />
                          Update Password
                        </Link>
                        <Link
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-accent"
                          onClick={handleDeleteAccount}
                        >
                          <FaTrashAlt className="mr-2" />
                          Delete Profile
                        </Link>
                        <Link
                          to="/login"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          onClick={() => {
                            toggleMenu();
                            handleLogout();
                          }}
                        >
                          <FaSignOutAlt className="mr-2 text-gold" />
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
                  className="px-6 py-2 font-medium text-gold border border-gold rounded-full hover:bg-gold hover:text-primary transition duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 font-medium text-primary bg-gold rounded-full hover:bg-gold-light transition duration-300 shadow-lg shadow-gold/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-primary border-t border-gold/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
                    onClick={toggleMobileMenu}
                  >
                    Admin
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/products/living-room"
                      className="flex items-center text-gray-300 px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
                      onClick={toggleMobileMenu}
                    >
                      <FaCouch className="mr-2 text-gold" />
                      Living Room
                    </Link>
                    <Link
                      to="/products/bedroom"
                      className="flex items-center text-gray-300 px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
                      onClick={toggleMobileMenu}
                    >
                      <FaBed className="mr-2 text-gold" />
                      Bedroom
                    </Link>
                    <Link
                      to="/products/kitchen"
                      className="flex items-center text-gray-300 px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
                      onClick={toggleMobileMenu}
                    >
                      <FaUtensils className="mr-2 text-gold" />
                      Kitchen
                    </Link>
                    <Link
                      to="/products/office"
                      className="flex items-center text-gray-300 px-3 py-2 rounded-md text-base font-medium hover:text-gold hover:bg-primary-light"
                      onClick={toggleMobileMenu}
                    >
                      <FaBriefcase className="mr-2 text-gold" />
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
