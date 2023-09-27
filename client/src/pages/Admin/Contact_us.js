import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from 'react-icons/ai';
import "./css/users.css";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(10); // Items per page

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

  // Calculate index of the last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item to be displayed on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstname.toLowerCase().includes(query) ||
      contact.lastname.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      contact.message.toLowerCase().includes(query)
    );
  });

  // Slice the filtered contacts array to display only the items for the current page
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout title={"Dashboard - All Contacts"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <section className="panel important">
            <div className="add">
              <div className="head-2">
                <div className="write-title">Contact Us</div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <div className="twothirds">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.firstname} </td>
                      <td>{contact.lastname}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.message}</td>
                      <td>
                        <button
                          className="btn btn-danger"
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
              <div className="pagination">
                <ul className="pagination">
                  {Array(Math.ceil(filteredContacts.length / itemsPerPage))
                    .fill()
                    .map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? 'active' : ''
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

export default ContactUs;
