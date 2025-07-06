import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/Signup", {
        name,
        email,
        password,
      });

      setLoading(false);

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Account created successfully! Redirecting to Login...");
        setMessageType("success");

        // Clear form
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      } else {
        setMessage("❌ Unexpected response from server.");
        setMessageType("error");
      }
    } catch (error) {
      setLoading(false);
      const errMsg =
        error.response?.data?.error || "❗ Error connecting to backend.";
      setMessage("❌ " + errMsg);
      setMessageType("error");
    }
  };

  return (
    <div className="signup-background">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Signup to Create Account</h2>
        <hr />

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "SIGN UP"}
        </button>

        <Link to="/login" className="back-link" tabIndex={loading ? -1 : 0}>
          ← Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Signup;
