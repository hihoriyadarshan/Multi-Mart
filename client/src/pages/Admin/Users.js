import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import "./css/users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(5); // Items per page

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

  // Delete user
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/delete-user/${pId}`);
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

  // Calculate index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to be displayed on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the users array to display only the items for the current page
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <tbody>
                  {filteredUsers.map((user) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Pagination */}
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
                  <button className="page-link" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
