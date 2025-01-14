const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5005;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const bookRoutes = require("./src/products/book.route");
const userRoute = require("./src/users/user.route");

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoute);

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");

    app.use("/", (req, res) => {
      res.send("Server is running");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

main();
