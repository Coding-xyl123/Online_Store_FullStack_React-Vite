const mongoose = require("mongoose");
const { title } = require("process");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
    },
    oldPrice: {
      type: Number,
    },
    newPrice: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
