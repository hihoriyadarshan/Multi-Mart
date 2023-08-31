import React, { useEffect } from 'react';
import './css/user.css';
import { NavLink } from "react-router-dom";

const Category = () => {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
    
        function activeLink() {
          list.forEach((item) => {
            item.classList.remove("hovered");
          });
          this.classList.add("hovered");
        }
    
        list.forEach((item) => item.addEventListener("mouseover", activeLink));
    
        let toggle = document.querySelector(".toggle");
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
    
        toggle.onclick = function () {
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
      }, []);
    
      return (
        <div>
          <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="#">
              <span className="icon">
                <ion-icon name="logo-apple" />
              </span>
              <span className="title">Brand Name</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <span className="icon">
                <ion-icon name="home-outline" />
              </span>
              <span className="title">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users">
              <span className="icon">
                <ion-icon name="people-outline" />
              </span>
              <span className="title">Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-categoty">
              <span className="icon">
                <ion-icon name="chatbubble-outline" />
              </span>
              <span className="title">Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-product">
              <span className="icon">
                <ion-icon name="help-outline" />
              </span>
              <span className="title">Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <span className="icon">
                <ion-icon name="settings-outline" />
              </span>
              <span className="title">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <span className="icon">
                <ion-icon name="lock-closed-outline" />
              </span>
              <span className="title">Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <span className="icon">
                <ion-icon name="log-out-outline" />
              </span>
              <span className="title" >Sign Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* ========================= Main ==================== */}
      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline" />
          </div>
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline" />
            </label>
          </div>
          <div className="user">
            <img src="assets/imgs/customer01.jpg" alt />
          </div>
        </div>
        
        {/* ================ Order Details List ================= */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Create Category</h2>
              <NavLink to="#" className="btn">View All</NavLink>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="status delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>Dell Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Apple Watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="status return">Return</span></td>
                </tr>
                <tr>
                  <td>Addidas Shoes</td>
                  <td>$620</td>
                  <td>Due</td>
                  <td><span className="status inProgress">In Progress</span></td>
                </tr>
                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="status delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>Dell Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>Apple Watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td><span className="status return">Return</span></td>
                </tr>
                <tr>
                  <td>Addidas Shoes</td>
                  <td>$620</td>
                  <td>Due</td>
                  <td><span className="status inProgress">In Progress</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          
        </div>
      </div>
    </div>
    {/* =========== Scripts =========  */}
    {/* ====== ionicons ======= */}
    
    <script src="assets/js/main.js"></script>
    
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>      
        </div>
        
    
      )
    }


export default Category
