const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Added cookie-parser
const User = require("./models/User");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const fs = require("fs");
const Post = require("./models/Post");
const connectDB = require("./configuration/dbConf");
const port = 4000;
const secretKey = "hgkdllepfjhj5666DHJF64jjdkdkldldj";

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser()); // Added cookie-parser

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body; // Changed username to email
  try {
    // Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const token = jwt.sign({ email, id: foundUser._id }, secretKey, {});
      res
        .cookie("token", token, { httpOnly: true })
        .json({ id: foundUser._id, email });
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, secretKey, {}, (err, userInfo) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    res.json(userInfo);
  });
});

app.post("/logout", (req, resp) => {
  resp.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, resp) => {
  const { title, summary, content } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, secretKey, {}, async (err, userInfo) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }
    const newPost = new Post({
      title,
      summary,
      content,
      cover: newPath,
      author: userInfo.id,
    });
    await newPost.save();
    resp.json(newPost);
  });
});

// mongodb+srv://ayoub:ayoub2024@alx.mtqvj3s.mongodb.net/?retryWrites=true&w=majority&appName=alx
