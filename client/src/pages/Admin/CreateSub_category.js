import React, { useState, useEffect } from "react";
import { Layout, Pagination, Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateSubCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [s_name, setS_Name] = useState("");
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data?.message || "Failed to fetch categories.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while getting categories.");
    }
  };

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

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleDelete = async (subCategoryId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-subcategory/${subCategoryId}`
      );
      if (data.success) {
        toast.success("Sub-Category deleted successfully");
        // Update the list of subcategories after deletion
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter(
            (subCategory) => subCategory._id !== subCategoryId
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //create sub-category
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const data = {
        s_name,
        category,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/subcategories`,
        data
      );

      if (response.data?.success) {
        toast.success("Sub-category Created Successfully");

        // Reset state values
        setS_Name("");
        setCategory("");
        // Refresh the list of subcategories after creation
        fetchSubCategories();
      } else {
        toast.error(response?.data?.message || "Failed to create sub-category");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid data. Please check your input.");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubCategories = subCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Layout title="sub-category">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <section className="panel important">
            <div className="add">
              <div className="head-3">
                <div className="write-title">Create Sub-category</div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <h2>Add Sub-Category</h2>
            <div className="twothirds">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
                placement="select category"
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={s_name}
                placeholder="Write a name"
                className="form-control"
                onChange={(e) => setS_Name(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Sub-category
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel important">
        <div>
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
                  <td>
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => {
                       
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        handleDelete(subCategory._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <center>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={subCategories.length}
              onChange={handlePageChange}
            />
          </center>
          <div className="pagination-functionality"></div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubCategory;
