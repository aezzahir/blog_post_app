const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ayoub:ayoub2024@alx.mtqvj3s.mongodb.net/?retryWrites=true&w=majority&appName=alx";

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.create({ email, password });
    console.log(`New user registered: ${email}`);
    res.json(userDoc);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(4000);
// mongodb+srv://ayoub:ayoub2024@alx.mtqvj3s.mongodb.net/?retryWrites=true&w=majority&appName=alx
