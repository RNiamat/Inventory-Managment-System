// Required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173",
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true }));
// app.options('*', cors()); // enable pre-flight for all routes


// Import your Mongoose models
const Product = require('./models/ProductManagement');
const Sale = require('./models/SalesOrder');
const StockEntry = require('./models/StockEntry');
const Supplier = require('./models/Supplier');
const User = require('./models/Users');

// --- Product Routes ---
app.post('/api/products', (req, res) => {
    console.log("Received POST:", req.body);
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        supplier: req.body.supplier,
        quantity: req.body.quantity,
        price: req.body.price,
        expiryDate: req.body.expiryDate
    });

    product.save()
        .then(savedProduct => {
            res.status(201).json(savedProduct);
        })
        .catch(err => {
            console.error("Error saving product:", err);
            res.status(500).json({ error: err.message });
        });
});

// --- Sales Routes ---
app.post('/api/sales', async (req, res) => {
    const sale = new Sale(req.body);
    console.log("📦 Request received:", req.body);
    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Stock Entry Routes ---
app.post('/api/stock', async (req, res) => {
    const stockEntry = new StockEntry(req.body);
    try {
        const newStock = await stockEntry.save();
        res.status(201).json(newStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Supplier Routes ---
app.post('/api/supplier', async (req, res) => {
    const supplier = new Supplier(req.body);
    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Signup Routes ---
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// --- Login Routes ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
