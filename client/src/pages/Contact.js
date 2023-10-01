// contact.js

import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import './css/Contact.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/contacts`, {
        firstname,
        lastname,
        email,
        phone,
        message,
      });

      if (data.success) {
        toast.success(data.message);

        // Clear form data
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        setMessage('');

        // Navigate home page
        navigate('/contact');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div>
        <section className="footer_get_touch_outer">
          <div className="container">
            <div className="footer_get_touch_inner grid-70-30">
              <div className="colmun-70 get_form">
                <div className="get_form_inner">
                  <div className="get_form_inner_text">
                    <h3>Get In Touch</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid-50-50">
                      <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                        required
                      />
                      <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        required
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone/Skype"
                        required
                      />
                    </div>
                    <div className="grid-full">
                      <textarea
                        placeholder="About Your Project"
                        onChange={(e) => setMessage(e.target.value)}
                        cols={30}
                        rows={10}
                        value={message}
                        required
                      />
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="colmun-30 get_say_form">
                <h5>Say Hi!</h5>
                <ul className="get_say_info_sec">
                  <li>
                    <i className="fa fa-envelope" />
                    <a href="mailto:Multimart3194@gmail.com">Multimart3194@gmail.com</a>
                  </li>
                  <li>
                    <i className="fa fa-whatsapp" />
                    <a href="tel:+919602381997">+91 9602381997</a>
                  </li>
                  <li>
                    <i className="fa fa-skype" />
                    <a href="#">Stackfindover</a>
                  </li>
                </ul>
                <ul className="get_say_social-icn">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
