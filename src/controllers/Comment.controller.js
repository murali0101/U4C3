const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const Upload = require("../middlerware/file.upload");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find().lean().exec();
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
