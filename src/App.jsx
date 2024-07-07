import { Routes, Route } from "react-router-dom";
import "./App.css";
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
import Websocket from "./components/Websocket";

export default function App() {
  return (
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
        <Route path="/detailsProduct/:slug" element={<DetailsProduct />} />
        <Route path="/listProducts/:category" element={<ListProducts />} />
        <Route path="/listProducts" element={<ListProducts />} />
      </Routes>
      <CartCompare />
      <Websocket></Websocket>
      <Footer />
    </>
  );
}
