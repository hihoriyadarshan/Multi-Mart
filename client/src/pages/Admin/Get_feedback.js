import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import { ImSearch } from "react-icons/im";

const Get_feedback = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState("csv");

  const getAllFeedback = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/feedback/getAllFeedback`
      );
      setContacts(data.contacts);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllFeedback();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstname.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  const currentContacts = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const downloadCSV = () => {
    const csvData = Papa.unparse(filteredContacts, { header: true });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "Feedback-data.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Data", 10, 10);

    doc.autoTable({
      head: [["Firstname", "Email", "Phone", "Message"]],
      body: currentContacts.map((contact) => [
        contact.firstname,
        contact.email,
        contact.phone,
        contact.message,
      ]),
    });

    doc.save("Feedback-data.pdf");
  };

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
    <Layout title={"Dashboard - All Feedback"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <section className="panel important">
            <div className="add">
              <div className="head-2">
                <div className="write-title">Feedback</div>
                <div className="search-container-left">
                  <input
                    type="text"
                    placeholder="Search by name, email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="search-icon">
                    <ImSearch className="search-md" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="panel important">
            <div className="download-1">
              <div className="download-options">
                <div className="download-options-inner">
                  <span>Download Type: </span>
                  <label>
                    <input
                      type="radio"
                      id="csvOption"
                      name="downloadOption"
                      value="csv"
                      checked={selectedOption === "csv"}
                      onChange={handleOptionChange}
                    />
                    CSV
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
                    <th>no</th>
                    <th>name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact, index) => (
                    <tr key={contact._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{contact.firstname}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.message}</td>
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

export default Get_feedback;