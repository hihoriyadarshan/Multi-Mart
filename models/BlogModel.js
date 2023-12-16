const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
