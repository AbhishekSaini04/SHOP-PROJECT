const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    imageURL: {
      type: String,
      default: "/stockImages/userDefault.jpg",
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = { usersModel };
