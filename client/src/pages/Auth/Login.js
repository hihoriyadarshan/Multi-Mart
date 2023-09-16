import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import "./css/Login.css"
import toast from 'react-hot-toast';
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'  
import { useAuth } from '../../context/auth';
import { MdEmail } from 'react-icons/md'; 
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from "react-router-dom";



const Login = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const[auth,setAuth] =useAuth("")
    const navigate = useNavigate()
    const location = useLocation()


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/auth/login`,
            {email,password}
            
            );
              if(res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || '/');
              }else{
                toast.error(res.data.message)
              }
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong')
        }
      }


  return (
    <Layout title="Register - Ecommer App">
    <div className="form-container">
      <div className="form-box">
       <center> <h4 className="form-title">Login FORM</h4> </center>
        <form onSubmit={handleSubmit}>

            <MdEmail/>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter Your Email"
              name='email'
              required
            />

            <RiLockPasswordFill/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter Your Password"
              name="password"
              required
            />
          <div className="forgot-password-link">
              <Link to="/forgot-password" onClick={()=>{navigate('/forgot-password')}}>Forgot Password?</Link>
            </div>
            <div></div>
          <input type='submit' value="Login" className="form-button"/>
        </form>
      </div>
      </div>
    </Layout>
  )
}

export default Login
