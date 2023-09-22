import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/users.css"; 
import { AiFillDelete } from 'react-icons/ai';


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

    //delete category
    const handleDelete = async (pId) => {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/auth/delete-user/${pId}`
        );
        if (data.success) {
          toast.success(`user is deleted`);
  
          getAllUsers();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Somtihing went wrong");
      }
    };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Action</th>
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
                            className="delete-button"
                            onClick={() => {
                              handleDelete(user._id);
                            }}
                          >
                              <AiFillDelete/>
                          </button>
                    </td>
                    <td>..</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
