const express = require("express");
const router = require("express").Router();
const Book = require("./book.model");
const { getSingleBook, updateBook, deleteABook } = require("./book.controller");
const { postABook, getAllBooks } = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken.");
const { validateHeaderName } = require("node:http");

//post a book
//post = when sumit
router.post("/create-book", verifyAdminToken, postABook);

//get all books
router.get("/", getAllBooks);

//get a book
router.get("/:id", getSingleBook);

//update a book
router.put("/edit/:id", verifyAdminToken, updateBook);

//delete a book
router.delete("/delete/:id", validateHeaderName, deleteABook);

module.exports = router;
