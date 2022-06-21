const Task = require("../models/task");

const createPostController = async function(req,res,next){
    try{
      const task = new Task({
        ...req.body,
        owner: req.user._id,
      });
      await task.save();
      res.status(201).json({ message: "success", task});
      next()
    }catch{
    res.status(404)
  }
  };

  // GET /tasks?completed=false
  // GET /tasks?limit=10&skip=0
  // GET /tasks?sortBy=createdAt:asc
  const findPostController = async function(req, res) {
    const match = {};
    const sort = {};
  
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
  
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
  
    try {
      await req.user
        .populate({
          path: "tasks",
          match,
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort,
          },
        })
        .execPopulate();
      res.json(req.user.tasks);
    } catch (e) {
      res.status(500).json();
    }
  };
  
  const findPostByIdController = async function(req, res) {
    const _id = req.params.id;
  
    try {
      const task = await Task.findOne({ _id, owner: req.user._id });
  
      if (!task) {
        return res.status(404).json();
      }
  
      res.json(task);
    } catch (e) {
      res.status(500).json();
    }
  };
  
  const findPostAndUpdateController = async function(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }
  
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
  
      if (!task) {
        return res.status(404).json({messagge:"this task doesn't belong to you"});
      }
  
      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();
      res.json(task);
    } catch (e) {
      res.status(400).json(e);
    }
  };
  
  const findPostAndDeleteController = async function(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
      });
  
      if (!task) {
        res.status(404).json({messagge:"this task doesn't belong to you"});
      }
  
      res.json(task);
    } catch (e) {
      res.status(500).json();
    }
  };
  
  module.exports = {
    createPostController,
    findPostController,
    findPostByIdController,
    findPostAndUpdateController,
    findPostAndDeleteController
  };