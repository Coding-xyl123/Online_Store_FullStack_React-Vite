const jwt = require("jsonwebtoken");
const User = require("../users/user.model");
const Book = require("../products/book.model"); // Import the Book model

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Access denied" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};

const isCreator = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { verifyToken, isAdmin, isCreator };
