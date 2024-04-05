import { useState, useRef } from "react";
import "./LoginLogout.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const preventRefresh = async (e, navigate) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!name || !email || !password) {
      alert("Plese Fill all the input field");
    } else {
      let data = await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      data = await data.json();

      if (data.data === false) {
        let result = await fetch("http://localhost:3000/register", {
          method: "post",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        console.log(result);
        alert("Signin Sucessfull.....");
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("EmailId Password is already Present");
      }
    }
  };

  return (
    <div className="main">
      <div className="wrapper signIn">
        <div className="form">
          <div className="heading">Signup</div>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                ref={nameRef}
              />
            </div>
            <div>
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </div>
            <button type="submit" onClick={(e) => preventRefresh(e, navigate)}>
              Submit
            </button>
          </form>
          <p>
            Have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
