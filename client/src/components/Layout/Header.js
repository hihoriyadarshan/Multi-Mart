// Header.js
import React from "react";
import { NavLink } from "react-router-dom"; // If using React Router
import logo from "../../images/logo.png";
import "./css/Header.css";
import { useAuth } from "../../context/auth";
import toast  from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully')
  }
  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/category">Category</NavLink>
        {/* <NavLink to="/about">About</NavLink> */}
        {/* <NavLink to="/contact">Contact</NavLink> */}
        {
          !auth.user ? (<>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          </>) : (<>
            <NavLink onClick={handleLogout} to="/logout">Logout</NavLink>
          
          </>)
        }
        
        <NavLink to="/Cart">Cart(0)</NavLink>



      </nav>
    </header>
  );
};

export default Header;
