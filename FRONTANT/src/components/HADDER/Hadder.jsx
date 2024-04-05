import React from "react";
import "./Hadder.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiSolidLogIn } from "react-icons/bi";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";

const Hadder = () => {
  const navigate = useNavigate();
  const handleLogout = (navigate) => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      alert("User Logged Out..");
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-sm main">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mid"
          id="navbarSupportedContent"
        >
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 item">
              {localStorage.getItem("user") ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/addproduct">
                      Add Products
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      <center>
                        <CgProfile />
                        <br />
                      </center>
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      onClick={(navigate) => handleLogout(navigate)}
                    >
                      <center>
                        <BiSolidLogIn />
                        <br />
                        Logout ({JSON.parse(localStorage.getItem("user")).name})
                      </center>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <center>
                        <BiSolidLogIn />
                        <br />
                        Login
                      </center>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      <center>
                        <BiSolidLogIn />
                        <br />
                        Signup
                      </center>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Hadder;
