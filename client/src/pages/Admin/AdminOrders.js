import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import { CSVLink } from "react-csv";
import { ImSearch } from "react-icons/im";
import { Select, Input, Radio ,Button} from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);

  const headers = [
    { label: "#", key: "#" },
    { label: "Status", key: "Status" },
    { label: "Buyer", key: "Buyer" },
    { label: "Date", key: "Date" },
    { label: "Payment", key: "Payment" },
    { label: "Quantity", key: "Quantity" },
  ];

  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [exportFormat, setExportFormat] = useState("pdf"); // Default export format

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterOrders(e.target.value);
  };

  const filterOrders = (query) => {
    const filtered = orders.filter((order) =>
      order.buyer?.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to generate and download a PDF or CSV based on the selected format
  const generateExport = () => {
    if (exportFormat === "pdf") {
      const doc = new jsPDF();

      doc.autoTable({
        head: [["#", "Status", "Buyer", "Date", "Payment", "Quantity"]],
        body: currentOrders.map((o, i) => [
          i + 1,
          o?.status,
          o.buyer?.name,
          moment(o.createAt).fromNow(),
          o.payment.success ? "Success" : "Failed",
          o.products.length,
        ]),
      });

      doc.save("orders.pdf");
    } else if (exportFormat === "csv") {
      // Prepare CSV data and trigger download
      const csvData = currentOrders.map((o, i) => ({
        "#": i + 1,
        "Status": o?.status,
        "Buyer": o.buyer?.name,
        "Date": moment(o.createAt).fromNow(),
        "Payment": o.payment.success ? "Success" : "Failed",
        "Quantity": o.products.length,
      }));

      const csvHeaders = headers.map((header) => header.label).join(",");
      const csvValues = csvData.map((item) =>
        headers.map((header) => item[header.key]).join(",")
      );
      const csvContent = [csvHeaders, ...csvValues].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <section className="panel important">
            <div className="add">
              <div className="head-2">
                <div className="write-title"> Manage Orders </div>
                <div className="search-container-left">
                  <Input
                    placeholder="Search by buyer name"
                    onChange={handleSearchChange}
                    value={searchQuery}
                  />
                  <div className="search-icon">
                    <ImSearch />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="panel important">
          
          <div className="download-2">
                <div className="download-options-inner">
                    <div className="download-options">
                    Download Type:
              <Radio.Group
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <Radio value="pdf" className="download-button">PDF</Radio>
                <Radio value="csv" className="download-button">Excel</Radio>
              </Radio.Group>
            
            <Button onClick={generateExport} >
            <span className="button-text">Download</span>
            </Button>
          </div>
        </div>
      </div>





            {currentOrders.map((o, i) => {
              return (
                <div className="border shadow" key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o.buyer?.name}</td>
                        <td>{moment(o.createAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Failed"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o.products.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="pagination">
              <ul className="pagination">
                {Array(Math.ceil(filteredOrders.length / itemsPerPage))
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
    </Layout>
  );
};

export default AdminOrders;
