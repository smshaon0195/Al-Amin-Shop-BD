import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CartProvider from "./OrderPage/CartContext.jsx";
import SearchProvider from "./assets/SearchContext/SearchContext.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </QueryClientProvider>
      </CartProvider>
    </SearchProvider>
  </StrictMode>,
);
