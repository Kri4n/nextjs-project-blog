"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "./lib/supabase";
import { useSelector } from "react-redux";
import BlogCard from "./components/BlogCard";
import CreatePostModal from "./components/CreatePostModal"; // Import modal

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  const blogsPerPage = 3;
  const start = (page - 1) * blogsPerPage;
  const end = start + blogsPerPage - 1;

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false })
        .range(start, end);

      if (error) throw new Error(error.message);
      return data;
    },
  });

  return (
    <div>
      <main className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold">
          Welcome {user ? user.email : "User"}
        </h1>
        <h1 className="text-xl mt-4 text-gray-600">
          Explore amazing blog posts!
        </h1>

        {/* Create Post Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-75"
        >
          Create Post
        </button>

        {isLoading && <p className="mt-6 text-gray-500">Loading posts...</p>}
        {isError && <p className="mt-6 text-red-500">Failed to load posts.</p>}

        {/* Blog Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-14 flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={blogs?.length < blogsPerPage}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Create Post Modal */}
        {isModalOpen && (
          <CreatePostModal onClose={() => setIsModalOpen(false)} />
        )}
      </main>
    </div>
  );
}
