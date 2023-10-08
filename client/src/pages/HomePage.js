import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { CgMouse } from "react-icons/cg";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import "./css/Home.css";
import { Prices } from "../components/Prices";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Feedback from "./user/Feedback";

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //filter category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //View more Product

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="MultiMart">
      <div
        className="container-fluid p-0 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="w-100"
                src="https://themewagon.github.io/foody2/img/carousel-1.jpg"
                alt="Image"
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">
                        Organic Food Is Good For Health
                      </h1>
                      <a
                        href
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Products
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="w-100"
                src="https://themewagon.github.io/foody2/img/carousel-2.jpg"
                alt="Image"
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <h1 className="display-2 mb-5 animated slideInDown">
                        Natural Food Is Always Healthy
                      </h1>
                      <a
                        href
                        className="btn btn-primary rounded-pill py-sm-3 px-sm-5"
                      >
                        Products
                      </a>
                      <a
                        href
                        className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3"
                      >
                        Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* <div className="banner">
        <p>Welcome To Multi-Mart</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div> */}

      <div className="col-lg-6">
        <div
          className="section-header text-start mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: 500 }}
        >
          <h1 className="display-5 mb-3">Our Products</h1>
        </div>
      </div>

      {/* <h2 className="homeHeading">Featured Products</h2> */}
      <div className="row mt-4">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                on
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price filter */}

          <h4 className="text-center mt-4">Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              {" "}
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="All-Product-Card">
            {/* {JSON.stringify(radio,null, 4)} */}
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="productCard " style={{ width: "18rem" }}>
                  {/* <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  /> */}
                  <div className="container">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text ms-25">
                      {p.description.substring(0, 35)}...
                    </p>
                    <div className="price">
                      <p className="card-text ms-2">₹{p.price}</p>
                    </div>
                  </div>

                  <div
                    class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.3s"
                  >
                    <div class="product-item">
                      <div class="position-relative bg-light overflow-hidden">
                        <img
                          class="img-fluid w-100"
                          alt=""
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          // alt ={p.name}
                        />
                        <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                          New
                        </div>
                      </div>
                      <div class="text-center p-4">
                        <a class="d-block h5 mb-2" href="">
                          Fresh Tomato
                        </a>
                        <span class="text-primary me-1">$19.00</span>
                        <span class="text-body text-decoration-line-through">
                          $29.00
                        </span>
                      </div>

                      <div className="cart-addmore">
                        <div className="d-flex border-top">
                          <small className="w-50 text-center border-end py-2">
                            <NavLink
                              to={`/product/${p.slug}`}
                              className="text-body"
                            >
                              <i className="fa fa-eye text-primary me-2" />
                              View detail
                            </NavLink>
                          </small>

                          <small className="w-50 text-center py-2">
                            <NavLink
                              className="text-body"
                              onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to cart");
                              }}
                            >
                              <i className="fa fa-shopping-bag text-primary me-2" />
                              Add to cart
                            </NavLink>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="col-12 text-center wow fadeInUp"
              data-wow-delay="0.1s"
            >
              {products && products.length < total && (
                <button
                  className="btn btn-primary rounded-pill py-3 px-5"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "View more"}
                </button>
              )}
              {/* <Feedback/> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
