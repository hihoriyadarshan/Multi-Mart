import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import "./Register.css"
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
// import { Link } from "react-router-dom";


const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] =useState("")
    const [phone,setPhone] =useState("")
    const [address,setAddress] =useState("")
    const [password,setPassword] =useState("")
    const navigate = useNavigate()

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/auth/register`,
            {name,email,phone,address,password}
            
            );
              if(res.data.success){
                toast.success(res.data.message)
                navigate('/login');
              }else{
                toast.error(res.data.message)
              }
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong')
        }
      }




  return (
    <Layout title="Register Multimart app" >
        <div className='register'>
        <h1>Register Page</h1>
       <div className="login-box">
  <h2>SignUp</h2>
  <form method="POST" onSubmit={handleSubmit}>
    <div className="user-box">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}   required />
      <label>Username</label>
    </div>


    <div className="user-box">
      <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} required />
      <label>email</label>
      <div className="user-box">
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <label>Phone Number</label>
        <div className="user-box">
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <label>Address</label>     
          <div className="user-box">
            <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
          <button to="#" type="submit">
            
            Submit 
          </button>
        </div>
      </div></div></form></div>

        </div>   
    </Layout>
  )
}


export default Register
