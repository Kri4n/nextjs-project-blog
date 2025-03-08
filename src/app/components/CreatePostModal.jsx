import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useSelector } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import Notyf CSS for notifications

/**
 * CreatePostModal Component
 * A modal for creating a new blog post.
 *
 * @param {Object} props - Component properties
 * @param {Function} props.onClose - Function to close the modal
 * @returns {JSX.Element} CreatePostModal component
 */
export default function CreatePostModal({ onClose }) {
  const user = useSelector((state) => state.auth.user); // Get logged-in user from Redux store
  const notyf = new Notyf(); // Initialize Notyf for notifications

  // State for managing form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for form submission

  /**
   * Handles the form submission to create a new blog post.
   *
   * @param {Event} e - Form submission event
   */
  const handleCreatePost = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate inputs
    if (!title || !content) {
      return notyf.error("Title and content are required!");
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("blogs").insert([
        {
          title,
          content,
          created_at: new Date(),
          user_id: user?.id || null, // Ensure user_id exists in Supabase
        },
      ]);

      if (error) {
        console.log(error);
        return notyf.error("Please Login first");
      }

      // Success handling
      notyf.success("Post created successfully!");
      setTitle("");
      setContent("");
      onClose(); // Close the modal after successful submission
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

        {/* Form for creating a blog post */}
        <form onSubmit={handleCreatePost}>
          {/* Title Input Field */}
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2"
          />

          {/* Content Input Field */}
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
              onClick={onClose} // Close modal on click
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
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
