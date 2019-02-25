const { Post, validatePost } = require('../models/post');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({created: -1});
  return res.send(posts);
});

router.post('/', auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: {
      id: req.user._id,
      name: req.user.name
    }
  });
  await post.save();
  res.send({"title": post.title, "post_id": post._id});
});

module.exports = router;