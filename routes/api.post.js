const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  createPostController,
  deletePostController,
  postFindByIdController,
  patchPostByIdController,
  findPostsController,
  findFilteredPostController
} = require("../controllers/postController");

// SAVE A NEW POST(OWNER POLICY AND AUTHOR ACTIVATED)
router.post("/api/posts", auth, createPostController);

//GET OWNER AND
router.get("/api/posts", findPostsController);

//GET OWNER POSTs
router.get("/api/posts/me", auth, findFilteredPostController);

// GET SINGLE POST (ANYONE)
router.get("/api/posts/:id", auth, postFindByIdController);

// UPDATE SINGLE POST
router.patch("/api/posts/:id", auth, patchPostByIdController);

// DELETE SINGLE POST
router.delete("/api/posts/:id", auth, deletePostController);

module.exports = router;
