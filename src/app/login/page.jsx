"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Login() {
  // State variables for storing user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize router and Redux dispatch
  const router = useRouter();
  const dispatch = useDispatch();

  let notyf; // Notification handler

  useEffect(() => {
    // Ensure Notyf is only initialized in the browser environment
    if (typeof window !== "undefined") {
      notyf = new Notyf();
    }
  }, []);

  /**
   * Handles user login process.
   * Prevents default form submission, authenticates with Supabase,
   * dispatches user data to Redux store, and navigates to home page on success.
   * Displays error messages in case of login failure.
   *
   * @param {Event} e - Form submission event
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page refresh

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notyf?.error("Login failed. Please check your credentials.");
    } else {
      dispatch(setUser(data.user)); // Store user data in Redux state
      notyf?.success(`Logged in successfully! Welcome ${email}`);
      router.push("/"); // Redirect to home page
    }
  };

  return (
    <div>
      <main className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 my-20">Login</h1>
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />

          {/* Login Button */}
          <button className="w-full bg-gray-800 text-white p-2 rounded">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
