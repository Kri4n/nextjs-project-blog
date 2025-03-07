import { useState } from "react";
import { useSelector } from "react-redux";

export default function BlogCard({ blog }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthor = user && user.id === blog.user_id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border rounded h-32"
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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

        {isAuthor && (
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-900"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-900">
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
