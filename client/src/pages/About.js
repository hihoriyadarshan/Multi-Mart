import React from "react";
import Layout from "../components/Layout/Layout";
import "./css/About.css";
import "./css/bootstrap.min.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div>
        <meta charSet="utf-8" />
        <title>Foody - Organic Food Website Template</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />
        {/* Favicon */}
        <link href="img/favicon.ico" rel="icon" />
        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Lora:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {/* Icon Font Stylesheet */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* Libraries Stylesheet */}
        <link href="lib/animate/animate.min.css" rel="stylesheet" />
        <link
          href="lib/owlcarousel/assets/owl.carousel.min.css"
          rel="stylesheet"
        />
        {/* Customized Bootstrap Stylesheet */}
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        {/* Template Stylesheet */}
        <link href="css/style.css" rel="stylesheet" />

        {/* About Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="about-img position-relative overflow-hidden p-5 pe-0">
                  <img className="img-fluid w-100" src="img/about.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <h1 className="display-5 mb-4">
                  Best Organic Fruits And Vegetables
                </h1>
                <p className="mb-4">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                  Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clita duo justo magna dolore erat amet
                </p>
                <p>
                  <i className="fa fa-check text-primary me-3" />
                  Tempor erat elitr rebum at clita
                </p>
                <p>
                  <i className="fa fa-check text-primary me-3" />
                  Aliqu diam amet diam et eos
                </p>
                <p>
                  <i className="fa fa-check text-primary me-3" />
                  Clita duo justo magna dolore erat amet
                </p>
                <a
                  className="btn btn-primary rounded-pill py-3 px-5 mt-3"
                  href=""
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Firm Visit Start */}
        <div className="container-fluid bg-primary bg-icon mt-5 py-6">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-md-7 wow fadeIn" data-wow-delay="0.1s">
                <h1 className="display-5 text-white mb-3">Visit Our Firm</h1>
                <p className="text-white mb-0">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                  Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clita duo justo magna dolore erat amet.
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                </p>
              </div>
              <div
                className="col-md-5 text-md-end wow fadeIn"
                data-wow-delay="0.5s"
              >
                <a
                  className="btn btn-lg btn-secondary rounded-pill py-3 px-5"
                  href=""
                >
                  Visit Now
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Firm Visit End */}
        {/* Feature Start */}
        <div className="container-fluid bg-light bg-icon py-6">
          <div className="container">
            <div
              className="section-header text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h1 className="display-5 mb-3">Our Features</h1>
              <p>
                Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum
                diam justo sed rebum vero dolor duo.
              </p>
            </div>
            <div className="row g-4">
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="bg-white text-center h-100 p-4 p-xl-5">
                  <img className="img-fluid mb-4" src="img/icon-1.png" alt="" />
                  <h4 className="mb-3">Natural Process</h4>
                  <p className="mb-4">
                    Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum
                    diam justo sed vero dolor duo.
                  </p>
                  <a
                    className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                    href=""
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="bg-white text-center h-100 p-4 p-xl-5">
                  <img className="img-fluid mb-4" src="img/icon-2.png" alt="" />
                  <h4 className="mb-3">Organic Products</h4>
                  <p className="mb-4">
                    Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum
                    diam justo sed vero dolor duo.
                  </p>
                  <a
                    className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                    href=""
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="bg-white text-center h-100 p-4 p-xl-5">
                  <img className="img-fluid mb-4" src="img/icon-3.png" alt="" />
                  <h4 className="mb-3">Biologically Safe</h4>
                  <p className="mb-4">
                    Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum
                    diam justo sed vero dolor duo.
                  </p>
                  <a
                    className="btn btn-outline-primary border-2 py-2 px-4 rounded-pill"
                    href=""
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Feature End */}
        {/* Footer Start */}
        <div
          className="container-fluid bg-dark footer pt-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h1 className="fw-bold text-primary mb-4">
                  F<span className="text-secondary">oo</span>dy
                </h1>
                <p>
                  Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                  erat ipsum et lorem et sit, sed stet lorem sit clita
                </p>
                <div className="d-flex pt-2">
                  <a
                    className="btn btn-square btn-outline-light rounded-circle me-1"
                    href=""
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-light rounded-circle me-1"
                    href=""
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-light rounded-circle me-1"
                    href=""
                  >
                    <i className="fab fa-youtube" />
                  </a>
                  <a
                    className="btn btn-square btn-outline-light rounded-circle me-0"
                    href=""
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Address</h4>
                <p>
                  <i className="fa fa-map-marker-alt me-3" />
                  123 Street, New York, USA
                </p>
                <p>
                  <i className="fa fa-phone-alt me-3" />
                  +012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope me-3" />
                  info@example.com
                </p>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Quick Links</h4>
                <a className="btn btn-link" href="">
                  About Us
                </a>
                <a className="btn btn-link" href="">
                  Contact Us
                </a>
                <a className="btn btn-link" href="">
                  Our Services
                </a>
                <a className="btn btn-link" href="">
                  Terms &amp; Condition
                </a>
                <a className="btn btn-link" href="">
                  Support
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Newsletter</h4>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: 400 }}
                >
                  <input
                    className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  © <a href="#">Your Site Name</a>, All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">
                  {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                  Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Back to Top */}
        <a
          href="#"
          className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a>
        {/* JavaScript Libraries */}
        {/* Template Javascript */}
      </div>
    </Layout>
  );
};

export default About;
