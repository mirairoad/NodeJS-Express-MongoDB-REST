// this is a sample with policyOwner
const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const {
  createPostController,
  findPostController,
  findPostByIdController,
  findPostAndUpdateController,
  findPostAndDeleteController
} = require('../controllers/taskController')


router.post("/api/tasks", auth, createPostController);

router.get("/api/tasks", auth, findPostController);

router.get("/api/tasks/:id", auth, findPostByIdController);

router.patch("/api/tasks/:id", auth, findPostAndUpdateController);

router.delete("/api/tasks/:id",auth, findPostAndDeleteController);

module.exports = router;
