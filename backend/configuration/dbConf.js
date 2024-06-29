const mongoose = require("mongoose");

const connectDB = async () => {
  const DATABASE_URI = "mongodb://127.0.0.1:27017/blogPost";
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
