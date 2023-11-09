import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, Input, Button } from "antd";
import Papa from "papaparse";
import "./Admin.css";
import { ImSearch } from "react-icons/im";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [csvData, setCsvData] = useState([]); // Initialize csvData state

  // Function to populate the csvData state with category data
  const prepareCSVData = (categories) => {
    return categories.map((category) => {
      return [category.name]; // Format data for CSV
    });
  };

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all categories and set the currentPage to 1
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
        setCurrentPage(1); // Reset current page when fetching new data
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Function to generate and download a CSV file
  const downloadCSV = () => {
    const dataForCSV = prepareCSVData(categories);
    const csv = Papa.unparse({ fields: ["Name"], data: dataForCSV });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "categories.csv";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to be displayed on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter and slice the categories array based on search term and pagination
  const filteredCategories = categories
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                <div className="write-title"> Manage Category</div>
                <div className="search-container-left">
                  <Input
                    placeholder="Search categories"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3"
                  />
                  <div className="search-icon">
                    <ImSearch />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <h2>Add Category</h2>
            <div className="twothirds">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
          </div>

          <div className="panel important">
            <div className="download-3">
              <div className="download-options-inner">
                <div className="download-options">
                  <Button className="download-button" onClick={downloadCSV}>
                    Download Excel
                  </Button>
                </div>
              </div>
            </div>

            <div className="twothirds">
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCategories.map((c, index) => (
                      <tr key={c._id}>
                        <td>{index + 1}</td>
                        <td>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
              {/* Pagination */}
              <div className="pagination">
                <ul className="pagination">
                  {Array(Math.ceil(categories.length / itemsPerPage))
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

export default CreateCategory;
