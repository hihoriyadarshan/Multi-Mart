import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from 'react-icons/ai';
import ReactPaginate from 'react-paginate'; // Import the react-paginate component
import "./css/users.css";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Added state for current page
  const usersPerPage = 10; // Number of users to display per page

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

  // Calculate the index range for the current page
  const pagesVisited = pageNumber * usersPerPage;
  const displayedUsers = users.slice(pagesVisited, pagesVisited + usersPerPage);

  // Function to handle page change
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
                <div className="write-title"> User </div>
              </div>
            </div>
          </section>
          <section className="panel important">
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
                <tbody>
                  {displayedUsers.map((user) => (
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
           
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(users.length / usersPerPage)}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"previous"}
                nextLinkClassName={"next"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
              />
             
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
