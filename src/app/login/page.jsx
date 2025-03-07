"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  let notyf;

  useEffect(() => {
    if (typeof window !== "undefined") {
      notyf = new Notyf();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notyf?.error("Login failed. Please check your credentials.");
    } else {
      dispatch(setUser(data.user));
      notyf?.success(`Logged in successfully!, Welcome ${email}`);
      router.push("/");
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button className="w-full bg-gray-800 text-white p-2 rounded">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
