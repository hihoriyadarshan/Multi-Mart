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
   
          <div className="container123">
          <div className="container-11">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaxuCl-tyOMjfTNy-jlX0xF-qKWybFP8AhA&usqp=CAU" alt />

            <div className="container-21" >

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
                  <div className="button1">
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
                
                <button type="#" className="btn btn-primary">
                  Back
                </button>
                </div>
                
                </div>
              </form>
            </div>
          </div>
        </div>
     
  );
};

export default Profile;
