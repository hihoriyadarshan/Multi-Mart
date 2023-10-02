import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Admin.css";
import {ImSearch} from 'react-icons/im';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(9); // Items per page
  const [searchInput, setSearchInput] = useState(""); // Search input
  const [searchResults, setSearchResults] = useState([]); // Search results

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Calculate index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to be displayed on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the products array to display only the items for the current page
  const currentProducts = searchInput ? searchResults : products.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    // Filter products based on the search input
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

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
                <div className="write-title"> Manage Product</div>
                <div className="search-container-left">
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <div className="search-icon">
                <ImSearch />
              </div>
              </div>
            </div>
            </div>
          </section>
          <div className="product-left-3">
            <div className="col-md-9">
              <div className="All-Product-Card">
                

                <div className="d-flex flex-wrap">
                  {currentProducts.map((product) => (
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
                {/* Pagination */}
                <ul className="pagination">
                  {Array(Math.ceil((searchInput ? searchResults.length : products.length) / itemsPerPage))
                    .fill()
                    .map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
