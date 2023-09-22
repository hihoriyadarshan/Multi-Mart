import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/users.css"; 
import { AiFillDelete } from 'react-icons/ai';

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-contact`);
      setContacts(data.contacts);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);



  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/contacts/${contactId}`);
      toast.success("Contact deleted successfully");
      getAllContacts(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact");
    }
  };



  return (
    <Layout title={"Dashboard - All Contacts"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Contacts</h1>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.firstname} {contact.lastname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.message}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => {
                          handleDeleteContact(contact._id);
                        }}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs;
