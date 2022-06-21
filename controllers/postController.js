const Post = require("../models/post");
const Profile = require("../models/profile");
const {
    paginatedResults,
    paginatedFilteredResults,
  } = require("../middleware/pagination");

// create post
const createPostController = async function (req, res, next) {
  let profile = await Profile.find({ owner: req.user._id });
  profile = profile[0];

  try {
    console.log(profile.profile_name);
    const post = new Post({
      ...req.body,
      owner: req.user._id,
      author: profile.profile_name,
    });
    console.log(post);
    await post.save();
    res.status(201).json({ message: "success", post });
    next();
  } catch {
    res.status(404).json({
      message: "failed",
      error: "please create a profile to interact with the platform",
    });
  }
};

// find by id and delete post
const deletePostController = async function (req, res, next) {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!post) {
      res.status(404).json({ messagge: "that is not yours" });
    }

    res.status(201).json({ message: "success", post });
  } catch (e) {
    res.status(500).json({ message: "failed" });
    console.log(e);
  }
};

// find single post
const postFindByIdController = async function (req, res, next) {
  const _id = req.params.id;

  try {
    const post = await Post.findOne({ _id });

    if (!post) {
      return res.status(404).json({ message: "this post is not yours" });
    }

    res.status(201).json({ message: "success", post });
  } catch (e) {
    res.status(500).json({ message: "failed" });
    console.log(e);
  }
};

// update post
const patchPostByIdController = async function (req, res, next) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const post = await Post.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!post) {
      return res.status(404).json({ messagge: "that is not yours" });
    }

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.status(201).json({ message: "success", post });
  } catch (e) {
    res.status(400).json({ message: "failed" });
    console.log(e);
  }
};

// find posts
const findPostsController = paginatedResults(Post);

  // find post by id and owner policy
const findFilteredPostController = paginatedFilteredResults(Post);

module.exports = {
  createPostController,
  deletePostController,
  postFindByIdController,
  patchPostByIdController,
  findPostsController,
  findFilteredPostController
};
