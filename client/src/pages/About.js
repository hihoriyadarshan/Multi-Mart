import React from "react";
import Layout from "../components/Layout/Layout";
import "./css/About.css";
import "./css/bootstrap.min.css";
import Footer from "../components/Layout/Footer";

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

        <div
          className="container-fluid page-header wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <h1 className="display-3 mb-3 animated slideInDown">About Us</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb mb-0"></ol>
            </nav>
          </div>
        </div>

        {/* About Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="about-img position-relative overflow-hidden p-5 pe-0">
                  <img
                    className="img-fluid w-100"
                    src="https://themewagon.github.io/foody2/img/about.jpg"
                    alt=""
                  />
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
      <Footer/>
    </Layout>
  );
};

export default About;
