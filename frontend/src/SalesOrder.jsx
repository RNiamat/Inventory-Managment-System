import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalesOrder.css";

function SalesOrder() {
  const [customerName, setCustomerName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    const order = {
      customerName,
      productId,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      paymentMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        order,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setLoading(false);
      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Order processed successfully!");
        setMessageType("success");

        // Clear form
        setCustomerName("");
        setProductId("");
        setQuantity("");
        setPrice("");
        setPaymentMethod("");

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage("❌ Unexpected response status: " + response.status);
        setMessageType("error");
      }
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.error || "❗ Error connecting to backend.";
      setMessage("❌ " + msg);
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <h2>Sales Order</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer-name">Customer Name</label>
          <input
            type="text"
            id="customer-name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="mobile-payment">Mobile Payment</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "PROCESS ORDER"}
        </button>
      </form>

      <button onClick={() => navigate("/")} disabled={loading}>
        ← Back to Home
      </button>
    </div>
  );
}

export default SalesOrder;
