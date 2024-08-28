const express = require("express");
const router = express.Router();
// const {shortURL}=require("../models/shortURLModel");
const { restrictTo } = require("../middlewares/auth");
const { productModel } = require("../models/productsModel");
// const {brandModel}=require("../models/brandModel");
const { blogModel } = require("../models/blogModel");
const {
  duplicateElementRemover,
} = require("../controller/duplicateElementRemover");

const { getCommentWithID } = require("../controller/getComment");
router.get("/", async (req, res) => {
  const user = req?.user;

  const blogs = await blogModel.find({});

  return res.render("home", { user: user, blogs: blogs });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
// DASHBOARD

router.get("/dashboard", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard/dashboard.ejs", { user: req.user });
});

//all uploaded products
router.get(
  "/dashboard/uploadedProducts",
  restrictTo(["ADMIN"]),
  async (req, res) => {
    const allProducts = await productModel.find({});
    //    console.log(allProducts);
    return res.render("dashboard/uploadedproducts", {
      allProducts: allProducts,
    });
  }
);

//add new product
router.get("/dashboard/addproduct", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard/addproduct", { condition: true });
});

// update exsisting products
router.get(
  "/dashboard/updateProduct/:id",
  restrictTo(["ADMIN"]),
  (req, res) => {
    return res.render("dashboard/addproduct", {
      condition: false,
      id: req.params.id,
    });
  }
);

// blog route
router.get("/blog/:blogId", async (req, res) => {
  const blogId = req.params?.blogId;
  let blog;
  const comments = await getCommentWithID(blogId);
  // console.log(comments);
  try {
    blog = await blogModel.findOne({ _id: blogId });
  } catch (e) {
    return res.redirect("/");
  }
  if (!blogId) {
    return res.redirect("/");
  }
  return res.render("blog", { blog: blog, user: req.user, comments: comments });
});

// add Blog
router.get("/dashboard/addblog", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard/addBlog", { condition: true });
});
// update exsisting blog
router.get("/dashboard/updateblog/:id", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard/addblog", {
    condition: false,
    id: req.params.id,
  });
});

//all uploaded blog
router.get(
  "/dashboard/uploadedBlogs",
  restrictTo(["ADMIN"]),
  async (req, res) => {
    const allBlogs = await blogModel.find({});
    //    console.log(allProducts);
    return res.render("dashboard/uploadedBlogs", {
      allBlogs: allBlogs,
    });
  }
);

module.exports = router;
