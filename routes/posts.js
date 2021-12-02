const express = require("express");
const postsContoller = require("../controllers/post.controller");

const router = express.Router();

router.post("/", postsContoller.save);
router.get("/", postsContoller.index);
router.get("/:id", postsContoller.show);
router.patch("/:id", postsContoller.update);
router.delete("/:id", postsContoller.destroy);

module.exports = router;
