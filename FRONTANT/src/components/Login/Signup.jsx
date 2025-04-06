import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const preventRefresh = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!name || !email || !password) {
      alert("Please fill all the input fields");
    } else {
      setLoading(true);
      try {
        let data = await fetch("https://e-commerce-backend-qljw.vercel.app/login", {
          method: "post",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        });
        data = await data.json();

        if (data.data === false) {
          let result = await fetch("https://e-commerce-backend-qljw.vercel.app/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
          });
          result = await result.json();
          alert("Signup Successful");
          localStorage.setItem("user", JSON.stringify(result.result));
          localStorage.setItem("token", JSON.stringify(result.auth));
          navigate("/");
        } else {
          alert("Email already exists");
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
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={preventRefresh} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
