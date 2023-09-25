import React from "react";
import { NavLink } from "react-router-dom";
import "./css/AdminMenu.css";



const AdminMenu = () => {
  return (
<div>
<div>
  <header role="banner">
    <h1>Admin Panel</h1>
    <ul className="utilities">
      <br />
      <li className="users"><NavLink to="/dashboard/user/profile">My Account</NavLink></li>
      <li className="logout warn"><NavLink to="#">Log Out</NavLink></li>
    </ul>
  </header>
  <nav  role="navigation">
    <div className="bg">
    <ul>
      <li className="dashboard"><NavLink to="admindashboard">Dashboard</NavLink></li>
      <li className="write"><NavLink to="/dashboard/admin/create-category">create Category</NavLink></li>
      <li className="write"><NavLink to="/dashboard/admin/create-product">create Product</NavLink></li>
      <li className="edit"><NavLink to="/dashboard/admin/products">Update Product</NavLink></li>
      <li className="cart"><NavLink to="/dashboard/admin/orders">Orders</NavLink></li>
      <li className="comments"><NavLink to="/dashboard/admin/contact_us">Contact Us</NavLink></li>
      <li className="users"><NavLink to="/dashboard/admin/users">Manage Users</NavLink></li>
    </ul>
    </div>
  </nav>

</div>
    
    </div>

)
}

export default AdminMenu



