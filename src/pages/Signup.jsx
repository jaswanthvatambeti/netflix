// src/pages/Signup.jsx
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form onSubmit={handleSignup} className="bg-opacity-70 bg-gray-900 p-10 rounded w-96 text-white">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input type="email" placeholder="Email" 
          className="w-full p-2 my-2 bg-gray-700 rounded"
          onChange={(e)=>setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          className="w-full p-2 my-2 bg-gray-700 rounded"
          onChange={(e)=>setPassword(e.target.value)} />

        <button className="w-full bg-red-600 py-2 mt-3 font-semibold rounded hover:bg-red-700">
          Sign Up
        </button>

        <p className="mt-3 text-sm">
          Already have an account?
          <span onClick={()=>navigate("/login")} className="text-blue-400 cursor-pointer ml-1">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
