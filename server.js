const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Schemas
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String
});

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  landmark: String,
  paymentMethod: String
});

const Contact = mongoose.model("Contact", contactSchema);
const Order = mongoose.model("Order", orderSchema);

// Routes
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.send("Contact form submitted successfully.");
  } catch (err) {
    res.status(500).send("Error saving contact info.");
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("Order placed successfully.");
  } catch (err) {
    res.status(500).send("Error placing order.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

