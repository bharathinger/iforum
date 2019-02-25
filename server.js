const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const CommentCount = require('./models/comment_count');
const app = express();
const config = require('config');

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR - jwt private key not defined');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
mongoose.connect('mongodb://muser:' + encodeURIComponent('admin@00')+'@172.17.0.2:27017/iforum?authSource=admin', {useNewUrlParser: true})
  .then(() => console.log('Connected to mongo db'))
  .catch((err) => console.error('could not connect to mongodb', err));

  let q = 'tasks';
 
  const open = require('amqplib').connect('amqp://172.17.0.3:5672');
   
  // Consumer
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log("message consumed", msg.content.toString())
          let data = JSON.parse(msg.content.toString());
          if(data.hasOwnProperty('post_id')) {
            console.log('post id', data.post_id);
            CommentCount.addCommentCount(data.post_id);
          }
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));