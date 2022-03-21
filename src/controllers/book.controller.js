const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const Upload = require("../middlerware/file.upload");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
