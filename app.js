const express = require("express");
const bodyParser = require("body-parser");

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/post", postsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
module.exports = app;
