const express = require("express");
const app = express();
// requiring
const cookieParser = require("cookie-parser");
const path = require("path");

// dotenv configuration
require("dotenv").config();

//requiring custom middleware
const { restrictTo, checkForAuthorization } = require("./middlewares/auth");

//requiring routes
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const brandRoute = require("./routes/brand");
//product Routes
const productRoute = require("./routes/product");
const addProductRoute = require("./routes/addProduct");
const deleteProductRoute = require("./routes/deleteProduct");
const updateProductRoute = require("./routes/updateProduct");
//Blog Routes
const addBlogRoute = require("./routes/blog/addBlog");
const deleteBlogRoute = require("./routes/blog/deleteBlog");
const updateBlogRoute = require("./routes/blog/updateBlog");

//comments route
const commentsRoute = require("./routes/Comment");
// app settings
app.set("trust proxy", true);
// app settings<<<<view engine>>>>
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(checkForAuthorization);
// DATABASE
const { connectToDB } = require("./config");
const connectionString =
  process.env.MONGODB_ONLINE || process.env.MONGODB_OFFLINE;
const PORT = 3000;

//database connection
connectToDB(connectionString);

// routes
app.use("/", addProductRoute);
app.use("/", commentsRoute);
app.use("/", userRoute);
app.use("/", brandRoute);
app.use("/", productRoute);
app.use("/", deleteProductRoute);
app.use("/", updateProductRoute);
// blog
app.use("/", addBlogRoute);
app.use("/", deleteBlogRoute);
app.use("/", updateBlogRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log("Server Runnin on PORT:", PORT);
});
