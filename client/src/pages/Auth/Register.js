import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import "./Register.css"
// import { Link } from "react-router-dom";


const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] =useState("")
    const [phone,setPhone] =useState("")
    const [address,setAddress] =useState("")
    const [password,setPassword] =useState("")

    //form function
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name,email,phone,address,password);
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
