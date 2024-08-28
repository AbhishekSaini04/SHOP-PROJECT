const { commentModel } = require("../models/commentModel");
const router = require("express").Router();
router.post("/comment/add", async (req, res) => {
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
  // next this
  //   // const story = await Story.
  //   // findOne({ title: 'Casino Royale' }).
  //   // populate('author').
  //   // exec();
  return res.json(result);
});

module.exports = router;
