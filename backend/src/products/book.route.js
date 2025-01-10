const express = require("express");
const router = require("express").Router();
const Book = require("./book.model");
const { getSingleBook, updateBook, deleteABook } = require("./book.controller");
const { postABook, getAllBooks } = require("./book.controller");

//post a book
//post = when sumit
router.post("/create-book", postABook);

//get all books
router.get("/", getAllBooks);

//get a book
router.get("/:id", getSingleBook);

//update a book
router.put("/edit/:id", updateBook);

//delete a book
router.delete("/delete/:id", deleteABook);

module.exports = router;
