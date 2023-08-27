import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './css/Register.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdDriveFileRenameOutline, MdEmail } from 'react-icons/md'; // Import the icons you need
import { RiLockPasswordFill } from 'react-icons/ri';
import { GiRotaryPhone } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        phone,
        address,
        password,
        answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container">
        <div className="form-box">
         <center> <h4 className="form-title">REGISTER FORM</h4> </center>
          <form onSubmit={handleSubmit}>
            <MdDriveFileRenameOutline/>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
            <MdEmail/>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter Your Email"
              required
            />
            <RiLockPasswordFill/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter Your Password"
              required
            />
            <GiRotaryPhone/>
            <input
              
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="Enter Your Phone"
              required
            />
            <AiFillHome/>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="Enter Your Address"
              required
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-input"
              placeholder="What is your birthdate"
              required
            />
            <button type="submit" className="form-button">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
