"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../lib/supabase"; // Import Supabase client instance
import { Notyf } from "notyf"; // Import Notyf for user-friendly notifications
import Swal from "sweetalert2"; // Import SweetAlert for confirmation dialogs

// Initialize Notyf only on the client-side
let notyf;
if (typeof window !== "undefined") {
  notyf = new Notyf();
}

/**
 * BlogCard Component
 * Displays a single blog post with edit and delete options for the author.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.blog - Blog post data object
 * @returns {JSX.Element} Blog card component
 */
export default function BlogCard({ blog }) {
  const user = useSelector((state) => state.auth.user); // Get logged-in user from Redux store
  const isAuthor = user && user.id === blog.user_id; // Check if the logged-in user is the blog author

  // Local state for modal visibility and editable blog fields
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  /**
   * Updates the blog post in Supabase
   */
  const updateBlog = async () => {
    console.log("Updating blog:", { title, content });

    const { error } = await supabase
      .from("blogs")
      .update({ title, content }) // Update title and content
      .eq("id", blog.id); // Identify blog post by ID

    if (error) {
      console.error("Error updating blog:", error.message);
      notyf.error("Failed to update blog.");
    } else {
      console.log("Blog updated successfully.");
      notyf.success("Updated");
      setIsModalOpen(false); // Close modal after update
    }
  };

  /**
   * Deletes the blog post after user confirmation
   */
  const deleteBlog = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // Reverse button order for better UX
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("blogs").delete().eq("id", blog.id);

      if (error) {
        console.error("Error deleting blog:", error.message);
        notyf.error("Failed to delete blog.");
      } else {
        console.log("Blog deleted successfully.");
        notyf.success("Blog deleted.");
      }
    }
  };

  return (
    <>
      {/* Modal for editing blog post */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded h-32"
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                onClick={updateBlog}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Card UI */}
      <div
        className={`bg-white shadow-md rounded-lg p-4 relative ${
          isModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <img
          src="https://blog.scielo.org/es/wp-content/uploads/sites/3/2018/03/blogs.png"
          alt="Blog"
          className="w-full h-40 object-cover rounded-md"
        />
        <h2 className="mt-4 text-lg font-semibold">{blog.title}</h2>
        <p className="mt-2 text-gray-600">{blog.content.substring(0, 100)}</p>
        <p className="mt-2 text-sm text-gray-500">
          Published on: {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p className="mt-2 text-sm text-gray-500">Author ID: {blog.user_id}</p>

        {/* Show edit & delete buttons if user is the author */}
        {isAuthor && (
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-900"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-900"
              onClick={deleteBlog}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
