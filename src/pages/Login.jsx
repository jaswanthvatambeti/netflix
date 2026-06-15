// src/pages/Login.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // after login redirect to home page
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-opacity-70 bg-gray-900 p-10 rounded w-96 text-white">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input type="email" placeholder="Email"
          className="w-full p-2 my-2 bg-gray-700 rounded"
          onChange={(e)=>setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          className="w-full p-2 my-2 bg-gray-700 rounded"
          onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full bg-red-600 py-2 mt-3 font-semibold rounded hover:bg-red-700">
          Login
        </button>

        <p className="mt-3 text-sm">
          New to Netflix?
          <span onClick={()=>navigate("/signup")} className="text-blue-400 cursor-pointer ml-1">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
