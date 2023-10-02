import React, { useState, useEffect, useRef } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import ReactPaginate from 'react-paginate';
import "./css/users.css";
import { saveAs } from "file-saver";
import papaparse from 'papaparse';
import jsPDF from "jspdf";



const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [downloadOption, setDownloadOption] = useState("csv");
  const usersPerPage = 10;
  const contentRef = useRef(null);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-users`);
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const offset = pageNumber * usersPerPage;

  const displayedUsers = filteredUsers
    .slice(offset, offset + usersPerPage)
    .map((user) => (
      <tr key={user._id}>
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
    ));

  const downloadCSV = () => {
    const csvData = papaparse.unparse(filteredUsers, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users-data.csv");
  };

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Define the columns and rows for your PDF table
    const columns = ["Username", "E-mail", "Phone", "DOB", "Address"];
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.phone,
      user.answer,
      user.address,
    ]);
  
    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
    });
  
    // Define the PDF file name
    const fileName = "users-data.pdf";
  
    // Save the PDF file
    doc.save(fileName);
  };
  


// Download PDf & CSv

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



  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3" ref={contentRef}>
        <div className="row">
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
                <ImSearch />
                </div>
              </div>
              </div>
            </div>
          </section>

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
                CSV
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
                    <th scope="col">Username</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Phone</th>
                    <th scope="col2">DOB</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{displayedUsers}</tbody>
              </table>
              <div className="pagination">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  previousLinkClassName={"previous"}
                  nextLinkClassName={"next"}
                  disabledClassName={"disabled"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
