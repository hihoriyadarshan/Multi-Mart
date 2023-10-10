import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const AllProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(9); // Items per page
  const [searchInput, setSearchInput] = useState(""); // Search input
  const [searchResults, setSearchResults] = useState([]); // Search results;
  const [id, setId] = useState("");

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
  const currentProducts = searchInput
    ? searchResults
    : products.slice(indexOfFirstItem, indexOfLastItem);

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

  // Function to delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product? "
      );
      if (!answer) return;
      // Make the delete request with the product ID
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      // Check if the delete operation was successful
      if (response.status === 200) {
        toast.success("Product Deleted Successfully");
        // Navigate to the appropriate page after successful deletion
        navigate("/dashboard/admin/AllProduct");
      } else {
        toast.error("Product Deletion Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="all-product-1">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <section className="panel important">
                <div className="add">
                  <div className="head-2">
                    <div className="write-title">All Product</div>
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

              <div className="table-users">
                <section className="panel important">
                  <div className="twothirds">
                    <table className="user-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Image</th>
                          <th scope="col">Brandname</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Description</th>
                          <th scope="col" className="desc">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts.map((product) => (
                          <tr key={product._id}>
                            <td>
                              <Link
                                to={`/dashboard/admin/product/${product.slug}`}
                                className="product-link"
                              >
                                {product.name}
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/dashboard/admin/product/${product.slug}`}
                                className="product-link"
                              >
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                                  className="All-p-img"
                                  alt={product.name}
                                />
                              </Link>
                            </td>
                            <td>Brandname</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description.substring(0, 40)}...</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  setId(product._id);
                                  handleDelete();
                                }}
                              >
                                <AiFillDelete />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <ul className="pagination">
                      {Array(
                        Math.ceil(
                          (searchInput
                            ? searchResults.length
                            : products.length) / itemsPerPage
                        )
                      )
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
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
