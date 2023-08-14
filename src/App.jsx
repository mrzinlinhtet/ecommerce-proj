import { Routes, Route } from "react-router-dom";
import "./style.css";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

const App = () => {
  return (
    <div className="container mx-auto bg-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
};

export default App;
