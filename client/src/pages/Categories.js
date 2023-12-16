import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "./css/Categories.css"; // Import your CSS file
import Footer from "../components/Layout/Footer";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mt-4" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </Layout>
  );
};

export default Categories;
