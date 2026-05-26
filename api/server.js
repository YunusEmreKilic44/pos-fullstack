const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

//routes
const categoryRoute = require("./routes/categoryRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const billRoute = require("./routes/billRoutes.js");
const authRoute = require("./routes/authRoutes.js");
const userRoute = require("./routes/userRoutes.js");

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
app.use(logger("dev"));

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}...`);
});
