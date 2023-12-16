import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Pagination } from "antd";

const AdminBlog = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get_all_subcategory`
        );

        if (response.data?.success) {
          setSubCategories(response.data?.category);
        } else {
          console.error(response.data?.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubCategories();
  }, []);

  // Calculate index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to be displayed on the current page
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  // Slice the subcategories array based on pagination
  const currentSubCategories = subCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              <div className="head-3">
                <div className="write-title">Show Sub-Categories</div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <div>
              <h2>Sub-Categories</h2>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubCategories.map((subCategory, index) => (
                    <tr key={subCategory._id}>
                      <td>{index + 1}</td>
                      <td>{subCategory.s_name}</td>
                      <td>{/* Add your action buttons here */}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={subCategories.length}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminBlog;
