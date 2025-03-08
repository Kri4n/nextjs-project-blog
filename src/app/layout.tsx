"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import "./globals.css";
import "notyf/notyf.min.css";

// Create a new QueryClient instance for managing server state
const queryClient = new QueryClient();

/**
 * Root layout component that wraps the application with necessary providers.
 *
 * - Uses Redux Provider to manage global state.
 * - Uses QueryClientProvider from React Query to handle data fetching.
 * - Includes a global Navbar component.
 * - Applies global styles from `globals.css`.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The main content of the application
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Wraps the app with Redux store provider */}
        <Provider store={store}>
          {/* Wraps the app with React Query provider for managing asynchronous data */}
          <QueryClientProvider client={queryClient}>
            <Navbar /> {/* Global navigation bar */}
            <main>{children}</main> {/* Main application content */}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
