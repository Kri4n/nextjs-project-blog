"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

/**
 * Navbar Component
 * A responsive navigation bar that adapts to both desktop and mobile screens.
 *
 * Features:
 * - Displays home link for all users.
 * - Shows login/signup links for unauthenticated users.
 * - Shows logout button for authenticated users.
 * - Mobile-friendly navigation with a collapsible menu.
 *
 * @returns {JSX.Element} Navbar component
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage mobile menu toggle
  const user = useSelector((state) => state.auth.user); // Get authenticated user from Redux store
  const dispatch = useDispatch(); // Redux dispatch function for actions

  return (
    <nav className="bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Blog Title */}
        <Link href="/" className="text-xl font-bold text-white">
          Blog
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white">
            Home
          </Link>
          {user ? (
            <button onClick={() => dispatch(logout())} className="text-white">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-white">
                Login
              </Link>
              <Link href="/signup" className="text-white">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu (Visible when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4">
          <Link
            href="/"
            className="text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                setMenuOpen(false);
              }}
              className="text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-white"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
