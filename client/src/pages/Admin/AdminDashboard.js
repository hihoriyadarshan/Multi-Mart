import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import "./Admin.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Function to get the count of different entities
  const getCount = async (endpoint, stateUpdater) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}${endpoint}`
      );
      stateUpdater(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    // Fetch counts for different entities
    getCount("/api/v1/product/product-count", setProductCount);
    getCount("/api/v1/auth/user-count", setUserCount);
    getCount("/api/v1/auth/contacts-count", setContactCount);
    getCount("/api/v1/feedback/feedback-count", setFeedbackCount);
    getCount("/api/v1/category/category-count", setCategoryCount);
    getCount("/api/v1/category/sub-category-count", setSubCategoryCount);
    getCount("/api/v1/product/order-count", setOrderCount);
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <section className="panel important">
            <div className="add">
              <div className="head-2">
                <div className="write-title12"> Dashboard </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="container-22">
        <div className="row-21">
          <div className="card-21">
            <Link to="/dashboard/admin/users">
              <center>
                <h2>Users</h2>
              </center>
              <br />
              <br />
              <p1>{userCount} </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="/dashboard/admin/AllProduct">
              <center>
                <h2>Total Product</h2>
              </center>
              <br />
              <br />
              <p1> {productCount}</p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="/dashboard/admin/create-category">
              <center>
                <h2>Category</h2>
              </center>
              <br />
              <br />
              <p1> {categoryCount} </p1>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-22">
        <div className="row-21">
          <div className="card-21">
            <Link to="/dashboard/admin/CreateSub_category">
              <center>
                <h2>Sub-Category</h2>
              </center>
              <br />
              <br />
              <p1>{subCategoryCount} </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="/dashboard/admin/orders">
              <center>
                <h2>Order</h2>
              </center>
              <br />
              <br />
              <p1> {orderCount}</p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="/dashboard/admin/contact_us">
              <center>
                <h2>Contact Us</h2>
              </center>
              <br />
              <br />
              <p1> {contactCount} </p1>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-22">
        <div className="row-21">
          <div className="card-21">
            <Link to="/dashboard/admin/get_all_feedback">
              <center>
                <h2>Feedback</h2>
              </center>
              <br />
              <br />
              <p1>{feedbackCount} </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="#">
              <center>
                <h2>Unused Entity</h2>
              </center>
              <br />
              <br />
              <p1> 0 </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="#">
              <center>
                <h2>Another Entity</h2>
              </center>
              <br />
              <br />
              <p1> 0</p1>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
