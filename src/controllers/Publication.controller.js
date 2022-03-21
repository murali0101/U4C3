const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication.model");
const Upload = require("../middlerware/file.upload");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const publication = await Publication.find().lean().exec();
    return res.status(200).send(publication);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});



module.exports = router;
