const { commentModel } = require("../models/commentModel");
const { restrictTo } = require("../middlewares/auth");
const router = require("express").Router();
router.post(
  "/comment/add",
  restrictTo(["ADMIN", "NORMAL"]),
  async (req, res) => {
    const { comment } = req.body;
    const blogId = req.query.id;
    const userId = req.user._id;
    if (!(comment && blogId && userId)) {
      return res.redirect(`/blog/${blogId}`);
    }
    const result = await commentModel.create({
      comment: comment,
      blog: blogId,
      by: userId,
    });

    return res.redirect(`/blog/${blogId}`);
  }
);

// router.get("/comment/add", async (req, res) => {
//   // next this
//   const comments = await commentModel
//     .find({
//       blog: "66ac6e85822099a8acf6ddcd",
//     })
//     .populate("by");
//   return res.json(comments);
// });

module.exports = router;
