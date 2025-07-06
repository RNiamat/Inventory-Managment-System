import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <header>
        <div className="logo">Supermart Inventory</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Signup">Signup</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Welcome to Supermart Inventory System</h1>
        <p>Click any section below to start managing your store efficiently.</p>
      </section>

      <section className="content">
        <div className="card"><Link to="/Login">Login</Link></div>
        <div className="card"><Link to="/Signup">Signup</Link></div>
        <div className="card"><Link to="/ProductManagement">Product Management</Link></div>
        <div className="card"><Link to="/StockEntry">Stock Entry</Link></div>
        <div className="card"><Link to="/SalesOrder">Sales Order</Link></div>
        <div className="card"><Link to="/SupplierManagement">Supplier Management</Link></div>
      </section>

      <footer>
        &copy; 2025 Rafia Niamat Projects. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
