
const mongoose = require("mongoose");

const publicationschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
  },
  {
       versionKey: false,
    timestamps: true,
  }
);

const Publication = mongoose.model("publication", publicationschema);
module.exports = Publication;
