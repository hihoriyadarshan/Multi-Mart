import React, { useState, useEffect, useRef } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import "./css/users.css";
import { saveAs } from "file-saver";
import papaparse from "papaparse";
import jsPDF from "jspdf";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadOption, setDownloadOption] = useState("csv");
  const contentRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${userId}`
      );
      if (data.success) {
        toast.success(`User is deleted`);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadCSV = () => {
    const csvData = papaparse.unparse(filteredUsers, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users-data.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const columns = ["#", "Username", "E-mail", "Phone", "DOB", "Address"];
    const rows = filteredUsers.map((user, index) => [
      index + 1,
      user.name,
      user.email,
      user.phone,
      user.answer,
      user.address,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    const fileName = "users-data.pdf";
    doc.save(fileName);
  };

  const handleOptionChange = (event) => {
    setDownloadOption(event.target.value);
  };

  const downloadFile = () => {
    if (downloadOption === "csv") {
      downloadCSV();
    } else if (downloadOption === "pdf") {
      downloadPDF();
    }
  };

  // Define the paginate function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="sc-x">
        <div className="container-fluid m-3 p-3" ref={contentRef}>
          <div className="row1">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <section className="panel important">
              <div className="add">
                <div className="head-2">
                  <div className="write-title"> User</div>
                  <div className="search-container-left">
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      className="search-container1"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="search-icon">
                      <ImSearch className="search-md" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="table-users">
              <section className="panel important">
                <div className="download-1">
                  <div className="download-options-inner">
                    <div className="download-options">
                      <span>Download Type:</span>
                      <label>
                        <input
                          type="radio"
                          name="downloadOption"
                          value="csv"
                          checked={downloadOption === "csv"}
                          onChange={handleOptionChange}
                        />
                        Excel
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="downloadOption"
                          value="pdf"
                          checked={downloadOption === "pdf"}
                          onChange={handleOptionChange}
                        />
                        PDF
                      </label>
                      <button
                        onClick={downloadFile}
                        className="download-button"
                        disabled={downloadOption === ""}
                      >
                        <span className="button-text">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="twothirds">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">Username</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((user, index) => (
                        <tr key={user._id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.answer}</td>
                          <td>{user.address}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="btn btn-danger"
                            >
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                  <ul className="pagination">
                    {Array(Math.ceil(filteredUsers.length / itemsPerPage))
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
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
