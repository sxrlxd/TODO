const express = require("express");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/taskRoutes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", taskRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
