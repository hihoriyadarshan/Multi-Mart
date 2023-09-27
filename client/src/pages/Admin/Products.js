import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Admin.css";


const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong"); // Corrected the typo
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
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
            <div className="write-title"> Manage Product
                   </div>
               </div>
          </div>
          </section>
      <div  className="product-left-3">
        <div className="col-md-9">
          <div className="All-Product-Card">
            <div className="d-flex flex-wrap">
              {products?.map((product) => (
                <Link
                  to={`/dashboard/admin/product/${product.slug}`}
                  className="product-link"
                  key={product._id} 
                >
                  <div className="productCard" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="container">
                      <h5 className="card-title">{product.name}</h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default Products;



