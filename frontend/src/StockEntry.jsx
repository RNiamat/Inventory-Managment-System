import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StockEntry.css";

function StockEntry() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [supplier, setSupplier] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    const entry = {
      productId,
      quantity: parseInt(quantity),
      dateAdded,
      supplier,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/stock",
        entry,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setLoading(false);

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Stock entry recorded successfully!");
        setMessageType("success");

        // Clear form
        setProductId("");
        setQuantity("");
        setDateAdded("");
        setSupplier("");

        // Optional: Redirect after 2 seconds
        // setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("❌ Unexpected response from server.");
        setMessageType("error");
      }
    } catch (error) {
      setLoading(false);
      const msg =
        error.response?.data?.error || "❗ Error connecting to backend.";
      setMessage("❌ " + msg);
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <h2>Stock Entry</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product-id">Product ID</label>
          <input
            type="text"
            id="product-id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-added">Date Added</label>
          <input
            type="date"
            id="date-added"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <input
            type="text"
            id="supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Recording..." : "RECORD STOCK ENTRY"}
        </button>
      </form>

      <a href="/" className="back-link">← Back to Home</a>
    </div>
  );
}

export default StockEntry;
