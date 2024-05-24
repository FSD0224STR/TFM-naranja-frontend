import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/LogContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";
import Product from "./components/Product";

import { ProductContextProvider } from "./context/ProductContext";

export default function App() {
  return (
    <AuthProvider>

      <ProductContextProvider>
        <>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/listProducts" element={<ListProducts />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
          <Footer />
        </>
      </ProductContextProvider>
    </AuthProvider>
  );
}
