const mongoose = require("mongoose");
const { commentModel } = require("../models/commentModel");
async function getCommentWithID(blogId = mongoose.Schema.ObjectId) {
  const comments = await commentModel.find({ blog: blogId }).populate("by");
  return comments;
}

module.exports = { getCommentWithID };
