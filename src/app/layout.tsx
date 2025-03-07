"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Ensure correct path to store
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Provider store={store}>
          {/* ✅ Wrap everything with Redux Provider */}
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
