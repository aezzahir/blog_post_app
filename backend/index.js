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
const path = require("path");
const Post = require("./models/Post");
const connectDB = require("./configuration/dbConf");
const connectRemoteDB = require("./configuration/dbRemoteConf");
const port = 4000;
const secretKey = "hgkdllepfjhj5666DHJF64jjdkdkldldj";

// Connect to MongoDB
connectDB();
connectRemoteDB();

// Middleware setup
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser()); // Added cookie-parser
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

// Add this route in index.js
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", ["email"]);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.get("/post", async (req, resp) => {
  resp.json(await Post.find().populate("author", ["email"]));
});

// mongodb+srv://ayoub:ayoub2024@alx.mtqvj3s.mongodb.net/?retryWrites=true&w=majority&appName=alx
// .populate("author", ["email"])
app.put("/post", upload.single("file"), async (req, res) => {
  const { id, title, summary, content } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).json({ error: "Not authenticated" });
  }

  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: "Post not found" });
      }

      const isAuthor = postDoc.author.toString() === info.id;
      if (!isAuthor) {
        return res.status(403).json({ error: "You are not the author" });
      }

      // Update the post fields
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;

      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        postDoc.cover = newPath;
      }

      await postDoc.save();
      res.json(postDoc);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });
});
