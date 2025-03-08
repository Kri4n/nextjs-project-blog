"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  // State variables for storing user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  /**
   * Handles user signup process.
   * Prevents default form submission, registers the user with Supabase,
   * and redirects to the login page upon successful registration.
   *
   * @param {Event} e - Form submission event
   */
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents page refresh

    const { error } = await supabase.auth.signUp({ email, password });

    if (!error) {
      alert("Registered Successfully");

      // Reset form fields after successful registration
      setEmail("");
      setPassword("");
      setUsername("");

      // Redirect user to the login page
      router.push("/login");
    }
  };

  return (
    <div>
      <main className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 my-20">Signup</h1>
        <form
          onSubmit={handleSignup}
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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded"
          >
            Signup
          </button>
        </form>
      </main>
    </div>
  );
}
