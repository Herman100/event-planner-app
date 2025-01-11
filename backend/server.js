// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// routes
app.use("/events", eventRoutes);

// Middleware
app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URI;

// MongoDB Connection
async function main() {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(`${URI}`);
    console.log("Successfully connected to Database");
    // Declaring Port and Use of Server
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

main();
