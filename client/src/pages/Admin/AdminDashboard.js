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
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-4">
              <h5>Dashboard</h5>
              <p>Total Products: {productCount}</p>
              <p>Total Users: {userCount}</p>
              <p>Total Contact:{ContactCount}</p>
              <p>Total feedback:{feedbackCount}</p>
              <p>Total Category:{categoryCount}</p>
              <p>Total sub-Category:{sub_categoryCount}</p>
              <p>Total Order:{orderCount}</p>
            </div>

            {/* <Link to="/">
              <div className="dashboard-item">Page 1</div>
            </Link>
            <Link to="/">
              <div className="dashboard-item">Page 2</div>
            </Link> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
