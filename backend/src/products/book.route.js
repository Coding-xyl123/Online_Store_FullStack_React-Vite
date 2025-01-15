const express = require("express");
const router = express.Router();
const Book = require("./book.model"); // Import the Book model
const { isCreator } = require("../middleware/verifyAdminToken");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook,
} = require("./book.controller");
const { verifyToken, isAdmin } = require("../middleware/verifyAdminToken");

// Post a book
router.post("/create-book", verifyToken, isAdmin, postABook);

// Get all books
router.get("/", getAllBooks);

// Get a book
router.get("/:id", getSingleBook);

// Update a book
router.put("/edit/:id", verifyToken, isAdmin, isCreator, updateBook);

router.put("/update-book/:id", verifyToken, isAdmin, isCreator, updateBook);

// Delete a book
router.delete("/delete/:id", verifyToken, isAdmin, isCreator, deleteABook);

module.exports = router;
