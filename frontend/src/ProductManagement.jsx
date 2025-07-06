import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductManagement.css";

export default function ProductManagement() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [message, setMessage] = useState("");       // For success/error messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    const product = {
      name,
      category,
      supplier,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      expiryDate: expiryDate || null,
    };

    axios
      .post("http://localhost:5000/api/products", product, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setLoading(false);
        // Accept both 200 and 201 as success
        if (response.status === 200 || response.status === 201) {
          setMessage("✅ Product added successfully!");
          setMessageType("success");

          // Reset form fields
          setName("");
          setCategory("");
          setSupplier("");
          setQuantity("");
          setPrice("");
          setExpiryDate("");

          // Redirect after 2 seconds (optional)
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setMessage(`Unexpected response status: ${response.status}`);
          setMessageType("error");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        const msg =
          err.response?.data?.error || "Error connecting to backend.";
        setMessage("❌ " + msg);
        setMessageType("error");
      });
  };

  return (
    <div className="pm-container">
      <h2>Product Management</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="packaged-food">Packaged Food</option>
            <option value="frozen-items">Frozen Items</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <input
            id="supplier"
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry-date">Expiry Date</label>
          <input
            id="expiry-date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "SAVE PRODUCT"}
        </button>
      </form>

      <a href="/" className="back-link">
        ← Back to Home
      </a>
    </div>
  );
}
