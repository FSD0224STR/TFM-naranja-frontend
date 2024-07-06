import { Routes, Route } from "react-router-dom";
import "./App.css";
// import { AuthProvider } from "./context/LogContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Comparador from "./components/Comparador";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct";
import ListProducts from "./components/ListProducts";
import EditProduct from "./components/EditProduct";
import DetailsProduct from "./components/DetailsProduct";
import CartCompare from "../src/components/CartCompare";

// import { ProductContextProvider } from "./context/ProductContext";
// import { CartContextProvider } from "./context/CartContext";
// import { SocketContextProvider } from "./context/SocketContext";
import Websocket from "./components/Websocket";

export default function App() {
  return (
    // <AuthProvider>
    //   <CartContextProvider>
    //     <ProductContextProvider>
    //       <SocketContextProvider>
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparador" element={<Comparador />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:slug" element={<EditProduct />} />
        {/* <Route path="/editProduct/:id" element={<EditProduct />} /> */}
        <Route path="/detailsProduct/:slug" element={<DetailsProduct />} />
        {/* <Route path="/detailsProduct/:id" element={<DetailsProduct />} /> */}
        <Route path="/listProducts/:category" element={<ListProducts />} />
        <Route path="/listProducts" element={<ListProducts />} />
      </Routes>
      <CartCompare />
      <Websocket></Websocket>
      <Footer />
    </>
    //       </SocketContextProvider>
    //     </ProductContextProvider>
    //   </CartContextProvider>
    // </AuthProvider>
  );
}
