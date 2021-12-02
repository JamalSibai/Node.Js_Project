const express = require("express");
const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", postsRoute);
module.exports = app;
