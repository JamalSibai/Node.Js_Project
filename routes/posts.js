const express = require("express");
const postsContoller = require("../controllers/post.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, postsContoller.save);
router.get("/", postsContoller.index);
router.get("/:id", postsContoller.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, postsContoller.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postsContoller.destroy);

module.exports = router;
