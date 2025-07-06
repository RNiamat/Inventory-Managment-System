import React from "react";
import './Contact.css';

function Contact() {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>📞 Contact Us</h2>
      <p>
        For any queries, suggestions, or support, feel free to contact us:
      </p>
      <p><strong>Email:</strong> support@example.com</p>
      <p><strong>Phone:</strong> +92 123 4567890</p>
      <p><strong>Location:</strong> Garrison University, Lahore</p>
      <p>
        We are available Monday to Friday, 9:00 AM to 5:00 PM.
        <br />
        You can also reach out via our social media handles.
      </p>
    </div>
  );
}

export default Contact;
