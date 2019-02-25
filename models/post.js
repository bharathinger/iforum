const Joi = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 150
	},
	content: {
		type: String,
		required: true,
		minlength: 10
	},
	user: {
		type: Object,
		id: {type: String, required: true},
		name: {type: String, required: true}
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

const Post = mongoose.model('Post', postSchema);

validatePost = (post) => {
	const schema = {
		title: Joi.string().min(5).max(150).required(),
		content: Joi.string().min(50).required(),
		user: Joi.object().keys({
			id: Joi.string().required(),
			name: Joi.string().required()
		})
	}
	return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validatePost = validatePost;