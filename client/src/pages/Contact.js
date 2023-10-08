// contact.js

import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "./css/Contact.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";

const Contact = () => {
  const [firstname, setFirstname] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/contacts`,
        {
          firstname,
          subject,
          email,
          message,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setFirstname("");
        setSubject("");
        setEmail("");
        setMessage("");
        navigate("/contact");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div>
        <meta charSet="utf-8" />
        <title>Foody - Organic Food Website Template</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content name="keywords" />
        <meta content name="description" />
        {/* Favicon */}
        <link href="img/favicon.ico" rel="icon" />
        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
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

        {/* Navbar Start */}

        {/* Navbar End */}
        {/* Page Header Start */}
        <div
          className="container-fluid page-header wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <h1 className="display-3 mb-3 animated slideInDown">Contact Us</h1>
            <nav aria-label="breadcrumb animated slideInDown">
              <ol className="breadcrumb mb-0"></ol>
            </nav>
          </div>
        </div>
        {/* Page Header End */}
        {/* Contact Start */}
        <div className="container-xxl py-6">
          <div className="container">
            <div
              className="section-header text-center mx-auto mb-5 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <h1 className="display-5 mb-3">Contact Us</h1>
            </div>
            <div className="row g-5 justify-content-center">
              <div
                className="col-lg-5 col-md-12 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="bg-primary text-white d-flex flex-column justify-content-center h-100 p-5">
                  <h5 className="text-white">Call Us</h5>
                  <p className="mb-5">
                    <i className="fa fa-phone-alt me-3" />
                    +012 345 67890
                  </p>
                  <h5 className="text-white">Email Us</h5>
                  <p className="mb-5">
                    <i className="fa fa-envelope me-3" />
                    info@example.com
                  </p>
                  <h5 className="text-white">Office Address</h5>
                  <p className="mb-5">
                    <i className="fa fa-map-marker-alt me-3" />
                    123 Street, New York, USA
                  </p>
                  <h5 className="text-white">Follow Us</h5>
                  <div className="d-flex pt-2">
                    <a
                      className="btn btn-square btn-outline-light rounded-circle me-1"
                      href
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-light rounded-circle me-1"
                      href
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-light rounded-circle me-1"
                      href
                    >
                      <i className="fab fa-youtube" />
                    </a>
                    <a
                      className="btn btn-square btn-outline-light rounded-circle me-0"
                      href
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-7 col-md-12 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="form-control-1"
                            id="name"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Your Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control-1"
                            id="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <div className="mb-3">
                          <label htmlFor="subject" className="form-label">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="form-control-1"
                            placeholder="Subject"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <div className="mb-3">
                          <label htmlFor="message" className="form-label">
                            Message
                          </label>
                          <textarea
                            className="form-control-1"
                            placeholder="Leave a message here"
                            id="message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            style={{ height: 200 }}
                            defaultValue={""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary rounded-pill py-3 px-5"
                        type="submit"
                        value="Submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}

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
      <Footer />
    </Layout>
  );
};

export default Contact;
