import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

import "./Dashboard.css";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    // Define a function to fetch the total count of products
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/product-count`
        ); // Adjust the URL to match your server's route
        setTotalProducts(response.data.total);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    // Call the function when the component mounts
    fetchProductCount();
  }, []);
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <div>
                <h2>Total Products: {totalProducts}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
