"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) {
      alert("Registered Successfully");
      setEmail("");
      setPassword("");
      setUsername("");
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
