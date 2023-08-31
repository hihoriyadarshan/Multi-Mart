import React from 'react'
// import { useAuth } from '../../context/auth'
import Layout from './Layout'
import './css/Profile.css'

const Profile = () => {
  return (
    // <div>
    //   <div className='col-md-9'>
    //     <div className='card'>
    //         <h1>Profile</h1>
    //       {/* <h1>{auth?.user?.name}</h1> */}
    //     </div>
    //   </div>
    // </div>
    <Layout>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile Page</title>
  {/* Custom Css */}
  <link rel="stylesheet" href="style.css" />
  {/* FontAwesome 5 */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
  {/* Navbar top */}
  <div className="navbar-top">
    <div className="title">
      <h1>Profile</h1>
    </div>
    {/* Navbar */}
    <ul>
      <li>
        <a href="#message">
          <span className="icon-count">29</span>
          <i className="fa fa-envelope fa-2x" />
        </a>
      </li>
      <li>
        <a href="#notification">
          <span className="icon-count">59</span>
          <i className="fa fa-bell fa-2x" />
        </a>
      </li>
      <li>
        <a href="#sign-out">
          <i className="fa fa-sign-out-alt fa-2x" />
        </a>
      </li>
    </ul>
    {/* End */}
  </div>
  {/* End */}
  {/* Sidenav */}
  <div className="sidenav">
    <div className="profile">
      <img src="https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png" alt width={100} height={100} />
      <div className="name">
        ImDezCode
      </div>
      <div className="job">
        Web Developer
      </div>
    </div>
    <div className="sidenav-url">
      <div className="url">
        <a href="#profile" className="active">Profile</a>
        <hr align="center" />
      </div>
      <div className="url">
        <a href="#settings">Settings</a>
        <hr align="center" />
      </div>
    </div>
  </div>
  {/* End */}
  {/* Main */}
  <div className="main">
    <h2>IDENTITY</h2>
    <div className="card">
      <div className="card-body">
        <i className="fa fa-pen fa-xs edit" />
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>ImDezCode</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>imdezcode@gmail.com</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>Bali, Indonesia</td>
            </tr>
            <tr>
              <td>Hobbies</td>
              <td>:</td>
              <td>Diving, Reading Book</td>
            </tr>
            <tr>
              <td>Job</td>
              <td>:</td>
              <td>Web Developer</td>
            </tr>
            <tr>
              <td>Skill</td>
              <td>:</td>
              <td>PHP, HTML, CSS, Java</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h2>SOCIAL MEDIA</h2>
    <div className="card">
      <div className="card-body">
        <i className="fa fa-pen fa-xs edit" />
        <div className="social-media">
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-facebook fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-twitter fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-instagram fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-invision fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-github fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-whatsapp fa-stack-1x fa-inverse" />
          </span>
          <span className="fa-stack fa-sm">
            <i className="fas fa-circle fa-stack-2x" />
            <i className="fab fa-snapchat fa-stack-1x fa-inverse" />
          </span>
        </div>
      </div>
    </div>
  </div>
  {/* End */}
</Layout>

    
  )
}

export default Profile
