import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/LogContext";
import { ProductContextProvider } from "./context/ProductContext";
import { CartContextProvider } from "./context/CartContext";
import { SocketContextProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
