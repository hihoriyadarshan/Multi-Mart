import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { FaUser, FaEnvelope, FaKey, FaPhone, FaMapMarker } from "react-icons/fa"; 
import "../css/profile.css";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    // <Layout title={"Your Profile"}>
      <div className="main">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
        
          </div>
          <div className="container">
          <div className="container-1">

          <div className="col-md-8">
            <div className="container-2" style={{ marginTop: "-40px" }}>
            <h4 className="">USER PROFILE</h4>

              <form onSubmit={handleSubmit}>
                <div className="field-row">
                  <div className="input-icon">
                    <FaUser />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="input-icon">
                    <FaEnvelope />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email "
                      disabled
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="input-icon">
                    <FaKey />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="input-icon">
                    <FaPhone />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="input-icon">
                    <FaMapMarker />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Address"
                    />
                  </div>
                </div>
                <div className="submit-btn">
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
                <button type="#" className="btn btn-primary">
                  Back
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    // </Layout>
  );
};

export default Profile;
