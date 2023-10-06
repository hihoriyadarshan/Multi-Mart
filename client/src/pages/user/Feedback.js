import React from 'react';
import '../css/Feedback.css'

const Feedback = () => {
  return (
    /* Contact section start */
    <section className="contact" id="contact">
      <span className="bg-design" />
      <span className="bg-design" />
      <span className="bg-design" />
      <span className="bg-design" />
      <div className="con-div">
        <h1>Get in Touch</h1>
        <p>Send a message! How can we help you?</p>
        <div className="set-con-div">
          <div className="msg-div">
            <input type="text" name="username" placeholder="Enter your name" />
            <input type="text" name="e-mail" placeholder="Enter your e-mail" />
            <textarea
              name="message"
              id="con-div-msg"
              maxLength={400}
              placeholder="Go ahead, we are listening..."
              defaultValue={''}
            />
            <input type="submit" name="submit" />
          </div>
          <div className="con-social-div">
            <div className="soc-head">
              <span /> <p>Social media</p> <span />
            </div>
            <div className="soc-icon">
              <i className="fab fa-facebook-f" />
            </div>
            <div className="soc-icon">
              <i className="fab fa-twitter" />
            </div>
            <div className="soc-icon">
              <i className="fab fa-instagram" />
            </div>
          </div>
          <div className="con-num-div">
            <div className="num-info">
              <i className="fas fa-map-marker-alt" />
              <p>108 Ahmedabad, Gujarat</p>
            </div>
            <div className="num-info">
              <i className="fas fa-phone-alt" />
              <p>675-908-7557</p>
            </div>
            <div className="num-info">
              <i className="fas fa-envelope" />
              <p>Classica@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
