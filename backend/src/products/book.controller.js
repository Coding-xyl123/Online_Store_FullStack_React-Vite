const Book = require("./book.model");
const express = require("express");
const router = express.Router();
const { isAdmin, isCreator } = require("../middleware/verifyAdminToken");

const postABook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body, createdBy: req.user.id });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book created successfully", book: newBook });
  } catch (err) {
    console.error("Failed to create book:", err);
    res.status(500).send({ message: "Failed to create book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (err) {
    console.error("Failed to fetch books:", err);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    console.error("Failed to fetch book:", err);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (book.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .send({ message: "You do not have permission to update this book" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    console.error("Failed to update book:", err);
    res.status(500).send({ message: "Failed to update book" });
  }
};

const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    if (book.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .send({ message: "You do not have permission to delete this book" });
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Book deleted successfully", book: deletedBook });
  } catch (err) {
    console.error("Failed to delete book:", err);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook,
};
