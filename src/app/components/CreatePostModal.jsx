import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useSelector } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function CreatePostModal({ onClose }) {
  const user = useSelector((state) => state.auth.user);

  const notyf = new Notyf();

  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleCreatePost = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!title || !content)
      return notyf.error("Title and content are required!");

    setLoading(true);

    try {
      const { data, error } = await supabase.from("blogs").insert([
        {
          title,
          content,
          created_at: new Date(),
          user_id: user?.id || null, // ✅ Ensure user_id exists in Supabase
        },
      ]);

      if (error) {
        console.log(error);
        return notyf.error("Please Login first");
      }

      // Success
      notyf.success("Post created successfully!");
      setTitle("");
      setContent("");
      onClose();
    } catch (err) {
      notyf.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

        {/* Form */}
        <form onSubmit={handleCreatePost}>
          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2"
          />

          {/* Content Input */}
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-3 h-32 resize-none focus:outline-none focus:ring-2"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
