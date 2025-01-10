const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book created successfully", book: newBook });
  } catch (err) {
    console.error("Failed to create book:", err);
    res.status(500).send({ message: "Failed to create" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (err) {
    console.error("Failed to fetch:", err);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(book);
  } catch (err) {
    console.error("Failed to fetch:", err);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};
//update
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    console.error("Failed to fetch:", err);
    res.status(500).send({ message: "Failed to fetch" });
  }
};

const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (err) {
    console.error("Failed to fetch:", err);
    res.status(500).send({ message: "Failed to delete" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook,
};
