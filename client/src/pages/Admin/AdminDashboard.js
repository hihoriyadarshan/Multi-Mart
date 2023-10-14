import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "./Admin.css";
import toast from "react-hot-toast";
import axios from "axios";

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // Corrected the variable name

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

  const getUserCount = async () => {
    // Corrected the function name
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
    getUserCount(); // Corrected the function name
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
              <p>Total Users: {userCount}</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
