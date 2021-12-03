const express = require("express");
const bodyParser = require("body-parser");

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", postsRoute);
app.use("/user", userRoute);
module.exports = app;
