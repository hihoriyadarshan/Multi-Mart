import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./css/Header.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import{Badge} from 'antd'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] =useCart()
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
      </div>
      <SearchInput />
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>

        <div className="dropdown">
          <button
            className="btn btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </button>

          <ul className="dropdown-menu">
            <li>
              
            </li>
            <li>
              <NavLink to={"/categories"}>All categories</NavLink>
            </li>

            {Array.isArray(categories) &&
              categories.map((c) => (
                <li key={c.slug}>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}

           
          </ul>
        </div>

        {!auth.user ? (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {auth?.user?.name}
            </button>

            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to={`dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="dropdown-item"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/Profile">Profile</NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout} to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        
        <Badge count={cart?.length} showZero>
        <li>
        <NavLink to="/Cart">Cart</NavLink>  </li>
        </Badge>
      
      </nav>
    </header>
  );
};

export default Header;
