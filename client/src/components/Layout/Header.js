// Header.js
import React from "react";
import { NavLink, Routes } from "react-router-dom"; // If using React Router
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
        {
          !auth.user ? (<>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          </>) : (<>
            <NavLink class="dropdown">
      <a class="btn btn-secondary dropdown-toggle"   data-bs-toggle="dropdown" aria-expanded="false">
         {auth?.user?.name}

      </a>

        <ul class="dropdown-menu">
          <li><NavLink to={`dashboard/${auth?.user?.role === 1? 'admin' : 'user'}`} class="dropdown-item" href="#">Dashboard</NavLink></li>
          <li><NavLink to="/Profile">profile</NavLink></li>
          <li><NavLink onClick={handleLogout} to="/logout">Logout</NavLink></li>
        </ul>
      </NavLink>
            
          
          </>)
        }
        
        <NavLink to="/Cart">Cart(0)</NavLink>



      </nav>
    </header>
  );
};

export default Header;
