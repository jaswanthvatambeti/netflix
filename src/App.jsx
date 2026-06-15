import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import MyList from "./pages/MyList.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";

export default function App() {
  return (
    <BrowserRouter>

      {/* Navbar should not show when on login/signup pages */}
      {window.location.pathname !== "/login" &&
       window.location.pathname !== "/signup" &&
       <Navbar />
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-list" element={<MyList />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
