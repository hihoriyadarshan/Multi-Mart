import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import "./css/users.css";
import { saveAs } from "file-saver";
import papaparse from "papaparse";
import jsPDF from "jspdf";
import { ImSearch } from "react-icons/im";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(10); // Items per page
  const [selectedOption, setSelectedOption] = useState("csv");

  //get all contact
  const getAllContacts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-contact`
      );
      setContacts(data.contacts);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  //delete contact
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/contacts/${contactId}`
      );
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
      contact.email.toLowerCase().includes(query)
    );
  });

  // Slice the filtered contacts array to display only the items for the current page
  const currentContacts = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadCSV = () => {
    const csvData = papaparse.unparse(filteredContacts, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Contact_us-data.csv");
  };

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.text("Contact Us Data", 10, 10);

    // Create a table for the data
    doc.autoTable({
      head: [["Firstname", "subject", "Email", "Message"]],
      body: currentContacts.map((contact) => [
        contact.firstname,
        contact.subject,
        contact.email,

        contact.message,
      ]),
    });

    // Save the PDF as "Contact_us-data.pdf"
    doc.save("Contact_us-data.pdf");
  };

  //pdf csv radio button

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const downloadFile = () => {
    if (selectedOption === "csv") {
      downloadCSV();
    } else if (selectedOption === "pdf") {
      downloadPDF();
    }
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
                <div className="write-title"> Contact_us</div>
                <div className="search-container-left">
                  <input
                    type="text"
                    placeholder="Search by name, email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="search-icon">
                    <ImSearch />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <div className="download-1">
              <div className="download-options">
                <div className="download-options-inner">
                  <span> Download Type : </span>
                  <label>
                    <input
                      type="radio"
                      id="csvOption"
                      name="downloadOption"
                      value="csv"
                      checked={selectedOption === "csv"}
                      onChange={handleOptionChange}
                    />
                    Excel
                    {/* <label htmlFor="csvOption">Download CSV</label> */}
                  </label>

                  <label>
                    <input
                      type="radio"
                      id="pdfOption"
                      name="downloadOption"
                      value="pdf"
                      checked={selectedOption === "pdf"}
                      onChange={handleOptionChange}
                    />
                    PDF
                    {/* <label htmlFor="pdfOption">Download PDF</label> */}
                  </label>

                  <button
                    onClick={downloadFile}
                    className="download-button"
                    disabled={selectedOption === ""}
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
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact, index) => (
                    <tr key={contact._id}>
                      <td>{index + 1}</td>
                      <td>{contact.firstname} </td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
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

export default ContactUs;
