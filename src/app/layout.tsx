"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import "./globals.css";
import "notyf/notyf.min.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {/* ✅ Now wrapped with QueryClientProvider */}
            <Navbar />
            <main>{children}</main>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
