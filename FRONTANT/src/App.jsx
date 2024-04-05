import "./App.css";
import Hadder from "./components/HADDER/Hadder";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/PRODUCTS/Products";
import AddProducts from "./components/ADD PRODUCTS/AddProducts";
import UpdateProducts from "./components/UPDATE PRODUCTS/UpdateProducts";
import Login from "./components//Login/Login";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Fotter/Footer";
import Signup from "./components/Login/Signup";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";

function App() {
  return (
    <div className="box">
      <Hadder />
      <div className="content">
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addproduct" element={<AddProducts />} />
            <Route path="/updateproduct/:id" element={<UpdateProducts />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
