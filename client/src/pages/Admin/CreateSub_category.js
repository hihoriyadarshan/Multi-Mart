import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateSubCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [s_name, setS_Name] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/get-category`
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while getting categories.");
      }
    };

    fetchCategories();
  }, []);

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
        navigate("dashboard/admin/CreateSub_category");
      } else {
        toast.error(response.data?.message);
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
                <div className="write-title"> Create Sub-category</div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <div className="twothirds">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
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
    </Layout>
  );
};

export default CreateSubCategory;
