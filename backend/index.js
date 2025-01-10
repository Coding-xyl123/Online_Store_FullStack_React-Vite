const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5005;
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173/p"],
    credentials: true,
  })
);
//UrhZUnbx73A3Rqro
const bookRoutes = require("./src/products/book.route");
app.use("/api/books", bookRoutes);
async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Server is running");
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
  .then(() => console.log("Mongo connect successfully"))
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
main().catch((err) => console.log(err));
