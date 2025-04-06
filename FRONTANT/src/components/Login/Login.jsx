import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const preventRefresh = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Please fill all the input fields");
    } else {
      setLoading(true);
      try {
        let data = await fetch("https://e-commerce-backend-qljw.vercel.app/login", {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await data.json();
        if (!data.auth) {
          alert("Email or Password doesn't match");
        } else {
          alert("Login Successful");
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("token", JSON.stringify(data.auth));
          navigate("/");
        }
      } catch (err) {
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={preventRefresh} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
