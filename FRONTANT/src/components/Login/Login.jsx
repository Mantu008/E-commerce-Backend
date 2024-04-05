import { useRef } from "react";
import "./LoginLogout.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const preventRefresh = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Plese Fill all the input field");
    } else {
      let data = await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      if (!data.auth) {
        alert("Email Id Passwod is not Match");
      } else {
        alert("Login Sucessfull.....");
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.auth));
        navigate("/");
      }
    }
  };
  return (
    <div className="main">
      <div className="wrapper signIn">
        <div className="form">
          <div className="heading">LOGIN</div>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                ref={emailRef}
                id="name"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="e-mail"
                ref={passwordRef}
                placeholder="Enter you Password"
              />
            </div>
            <button type="submit" onClick={(e) => preventRefresh(e)}>
              Submit
            </button>
          </form>
          <p>
            Don't have an account ? <Link to="/signup"> Sign In </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
