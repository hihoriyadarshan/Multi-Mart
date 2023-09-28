import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import "./css/users.css";
import { saveAs } from "file-saver";
import papaparse from 'papaparse'; // Import papaparse

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;

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

  // CSV download
  const downloadCSV = () => {
    const csvData = papaparse.unparse(filteredUsers, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users-data.csv");
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <section className="panel important">
            <div className="add">
              <div className="head-2">
                <div className="write-title"> User</div>
                <button onClick={downloadCSV} className="download-csv">
                  Download CSV
                </button>
              </div>
            </div>
          </section>

          <section className="panel important">
            <div className="twothirds">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
