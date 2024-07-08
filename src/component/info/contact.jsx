import React from "react";
import "../../CSS/contact.css";

const Contact = () => {
  return (
    <div className="ccontainer">
      <form className="contact-form " action="">
        <div className="title">
          <h2>We are looking forward to the conversation</h2>
        </div>
        <div>
          <div className="name-group">
            <input id="fname" type="text" placeholder="First Name" />
            <input id="lname" type="text" placeholder="Last Name" />
          </div>
          <div className="inputgroup2">
            <input id="email" type="text" placeholder="Email" />
            <textarea
              name="message"
              id="message"
              placeholder="Message"
            ></textarea>
          </div>

          <div className="btn">
            <button id="submit" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
