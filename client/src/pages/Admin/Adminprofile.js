import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';

import "./Admin.css"; 

const Adminprofile = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
              <h3> Admin Address : {auth?.user?.address}</h3>
              <button className='btn-moredetails' onClick={() => navigate('/dashboard/admin/AdminUpdateProfile')}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adminprofile;
