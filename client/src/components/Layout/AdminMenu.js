import React from "react";
import { NavLink } from "react-router-dom";
import "./css/AdminMenu.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import logo from "../../images/logo.png";

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();

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
    <div>
      <div>
        <header role="banner">
          <center>Admin Panel</center>
          <img src={logo} alt="Logo" className="logo" />
          <ul className="utilities">
            <br />
            <li className="users">
              <NavLink to="/dashboard/admin/Adminprofile">My Account</NavLink>
            </li>
            <li className="logout warn">
              <NavLink onClick={handleLogout} to="/logout">
                Log Out
              </NavLink>
            </li>
          </ul>
        </header>
        <nav role="navigation">
          <div className="bg">
            <ul>
              <li className="dashboard">
                <NavLink to="/dashboard/admin">Dashboard</NavLink>
              </li>
              <li className="write">
                <NavLink to="/dashboard/admin/create-category">
                  create Category
                </NavLink>
              </li>
              <li className="write">
                <NavLink to="/dashboard/admin/CreateSub_categoty">
                  sub-Category
                </NavLink>
              </li>
              <li className="write">
                <NavLink to="/dashboard/admin/create-product">
                  Create Product
                </NavLink>
              </li>
              <li className="edit">
                <NavLink to="/dashboard/admin/products">Manage Product</NavLink>
              </li>
              <li className="edit">
                <NavLink to="/dashboard/admin/AllProduct">All Product</NavLink>
              </li>
              <li className="<FaCartPlus/>">
                <NavLink to="/dashboard/admin/orders">Manage Orders</NavLink>
              </li>

              <li className="write">
                <NavLink to="/dashboard/admin/AdminBlog">Blog Post</NavLink>
              </li>

              <li className="comments">
                <NavLink to="/dashboard/admin/contact_us">Contact</NavLink>
              </li>

              <li className="users">
                <NavLink to="/dashboard/admin/users">Manage Users</NavLink>
              </li>

              <li className="users">
                <NavLink to="/dashboard/admin/get_all_feedback">
                  view Feedback
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
