"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Blog
        </Link>

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

      {/* Mobile Menu */}
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
