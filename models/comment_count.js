const Joi = require('joi');
const mongoose = require('mongoose');

const commentCountSchema = new mongoose.Schema({
	post_id: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	},
	modified: {
		type: Date,
		default: Date.now()
	}
});

const CommentCount = mongoose.model('CommentCount', commentCountSchema);

addCommentCount = async (post_id) => {
	const post = await CommentCount.findOne({ post_id: post_id });
  if(post) {
		await CommentCount.updateOne({_id: post._id}, {count: post.count + 1, modified: Date.now()});
	} else {
		let cc = new CommentCount({
			post_id: post_id,
			count: 1
		});
		response = await cc.save()
	}
}

exports.addCommentCount = addCommentCount;
