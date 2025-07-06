import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SupplierManagement.css";

function SupplierManagement() {
  const [supplierName, setSupplierName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplier = {
      supplierName,
      contactPerson,
      phone,
      email,
      address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/supplier",
        supplier,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Supplier saved successfully!");
        setMessageType("success");

        // Reset form
        setSupplierName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setAddress("");
      } else {
        setMessage("⚠️ Unexpected server response.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Supplier save error:", error);
      const msg =
        error.response?.data?.error || "❗ Error connecting to backend.";
      setMessage("❌ " + msg);
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <h2>Supplier Management</h2>

      {/* Message box */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="supplier-name">Supplier Name</label>
          <input
            type="text"
            id="supplier-name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-person">Contact Person</label>
          <input
            type="text"
            id="contact-person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">SAVE SUPPLIER</button>
      </form>
      <a href="/" className="back-link">← Back to Home</a>
    </div>
  );
}

export default SupplierManagement;
