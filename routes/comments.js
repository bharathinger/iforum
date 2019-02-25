const { Comment, validateComment } = require('../models/comment');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/:post_id', async (req, res) => {
  if(!req.params.post_id) return res.status(400).send('Post id is not provided');
  const comments = await Comment.find({'post_id': req.params.post_id}).sort({'created': 1});
  return res.send(comments);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  comment = new Comment({
    post_id: req.body.post_id,
    comment: req.body.comment,
    user: {
      id: req.user._id,
      name: req.user.name
    }
  });
  await comment.save();
  let q = 'tasks';
 
  const open = require('amqplib').connect('amqp://172.17.0.3:5672');
 
  // Publisher
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
      return ch.assertQueue(q).then(function(ok) {
      return ch.sendToQueue(q, Buffer.from(JSON.stringify({"post_id": req.body.post_id})));
    });
  }).catch(console.warn);
  res.send({"comment": comment.comment, "comment_id": comment._id});
  });

module.exports = router;