const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb://localhost:27017/contact_form"; // Store MongoDB URI in a .env file
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define a contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// POST route to save contact form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

// GET route to fetch all contacts (for admin panel)
app.get("/api/admin/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching contacts" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
