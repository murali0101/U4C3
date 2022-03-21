const express = require("express");
const app = express();
const UserController= require("./controllers/user.controller")
const PublicationController = require("./controllers/Publication.controller");
const CommentController = require("./controllers/Comment.controller");
const BookController = require("./controllers/book.controller");

app.use(express.json())
app.use("/user", UserController);
app.use("/publication", PublicationController);
app.use("/comment", CommentController);
app.use("/book", BookController);
module.exports = app;
