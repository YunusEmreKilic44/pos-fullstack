const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const categoryRoute = require("./routes/categoryRoutes.js");

const app = express();

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(cors());

app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}...`);
});
