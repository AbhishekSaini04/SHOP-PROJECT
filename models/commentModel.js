const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    // blog: { type: String, ref: "blog" },
    // by: { type: String, ref: "user" },
    blog: { type: mongoose.Schema.ObjectId, ref: "blog" },
    by: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);
module.exports = { commentModel };
