import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from 'react-icons/ai';
import "./css/users.css"; 

const Users = () => {
  const [users, setUsers] = useState([]);

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
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${pId}`
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
              User </div>
          </div>
          </section>
          <section className="panel important">
            <table className="table" style={{ fontSize: 16 }}>
              <thead>
                <tr>
                <th scope="col">Username</th>
                  <th scope="col">Username</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Phone</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
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
            </section>
          </div>
        </div>
      
    </Layout>
  );
};

export default Users;
