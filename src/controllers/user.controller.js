const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Upload = require("../middlerware/file.upload");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post(
  "/",
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Name").custom((val) => {
    if (val.length <= 3 || val.length > 30) {
      throw new Error("Name length Should be 3 to 30 letters");
    }
    return true
  }),
    
  body("lastName").custom((val) => {
    if (val.length <= 3 || val.length > 30) {
      throw new Error("Name length Should be 3 to 30 letters");
    }
    return true
  }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Age")
    .isNumeric()
    .withMessage("Please Enter Your Age in Numeric")
    .custom((val) => {
      if (val < 0 || val > 150) {
        throw new Error("Age Should be 1 to 150");
      }
       return true;
    }),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Please Enter Your email")
    .isEmail()
    .withMessage("Please Enter Your email")
    .custom(async(val) => {

        const user = await User.findOne({ email :val})

      if(user) {
        throw new Error("Email already exist");
      }
       return true;
    }),
  Upload.single("profileImages"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        profileImages: req.file.path,
      });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = router;
