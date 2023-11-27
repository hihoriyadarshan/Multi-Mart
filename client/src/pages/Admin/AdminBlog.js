import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminBlog = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <section className="panel important">
            <div className="add">
              <div className="head-3">
                <div className="write-title"> Blog Post</div>
              </div>
            </div>
          </section>


          
        </div>
      </div>


    </Layout>
  );
};

export default AdminBlog;
