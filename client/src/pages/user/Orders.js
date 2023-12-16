import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import "../../components/Layout/css/user.css";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout title={"Your Orders"}>
      <div className="order-title">All Orders</div>

      <div className="container-flui p-3 m-3 dashboard">
        {currentOrders.map((o, i) => (
          <div className="border-shadow" key={i}>
            <table className="table-1">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{indexOfFirstOrder + i + 1}</td>
                  <td>{o?.status}</td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createAt).fromNow()}</td>
                  <td>{o?.payment.success ? "Success" : "Failed"}</td>
                  <td>{o?.products?.length}</td>
                </tr>
              </tbody>
            </table>
            <div className="container-order">
              {o?.products?.map((p, j) => (
                <div className="row mb-2 p-3 card flex-row" key={j}>
                  <div className="Order-img">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top-1"
                      alt={p.name}
                      width="100px"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8-9">
                    <p-1>{p.name}</p-1>
                    <p>Price: ₹ {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <div className="order-pagination">
                <a onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </a></div>
              </li>
            )
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Orders;
