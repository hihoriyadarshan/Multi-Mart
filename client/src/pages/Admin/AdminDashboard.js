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
  const [ContactCount, setContactCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [sub_categoryCount, setsub_CategoryCount] = useState(0);
  const [orderCount, setorderCount] = useState(0);

  //get product count
  const getProductCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setProductCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getProductCount();
  }, []);

  //get user count
  const getUserCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-count`
      );
      setUserCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getUserCount();
  }, []);

  //contact count
  const getContactCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/contacts-count`
      );
      setContactCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getContactCount();
  }, []);

  //contact count
  const getfeedbackCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/feedback/feedback-count`
      );
      setFeedbackCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getfeedbackCount();
  }, []);

  //category-count

  const getcategoryCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/category-count`
      );
      setCategoryCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getcategoryCount();
  }, []);

  //sub-category count

  const getsub_categoryCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/sub-category-count`
      );
      setsub_CategoryCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getsub_categoryCount();
  }, []);

  //order count

  const getorderCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/order-count`
      );
      setorderCount(response.data.total);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getorderCount();
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
            {/* </div> */}
          </section>
        </div>
      </div>

      <div className="container-22">
        <div className="row-21">
          <div className="card-21">
            <Link to="/dashboard/admin/users">
              <center>
                {" "}
                <h2>Users</h2>
              </center>
              <br />
              <br />
              <p1 font-size="200px;">{userCount} </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="/dashboard/admin/AllProduct">
              <center>
                {" "}
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
                {" "}
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
            <Link to="/dashboard/admin/CreateSub_categoty">
              <center>
                {" "}
                <h2>Sub-Category</h2>
              </center>
              <br />
              <br />
              <p1 font-size="200px;">{sub_categoryCount} </p1>
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
              <p1> {ContactCount} </p1>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-22">
        <div className="row-21">
          <div className="card-21">
            <Link to="/dashboard/admin/get_all_feedback">
              <center>
                {" "}
                <h2>Feedback</h2>{" "}
              </center>
              <br />
              <br />
              <p1 font-size="200px;">{feedbackCount} </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="">
              <center>
                {" "}
                <h2>Unused Auhtority</h2>{" "}
              </center>
              <br />
              <br />
              <p1>0 </p1>
            </Link>
          </div>

          <div className="card-21">
            <Link to="">
              <center>
                {" "}
                <h2>Unused Auhtority</h2>
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
