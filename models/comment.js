const Joi = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	post_id: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true,
		minlength: 2
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

const Comment = mongoose.model('Comment', commentSchema);

validateComment = (comment) => {
	const schema = {
		comment: Joi.string().min(2).required(),
		post_id: Joi.string().required(),
		user: Joi.object().keys({
			id: Joi.string().required(),
			name: Joi.string().required()
		})
	}
	return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validateComment = validateComment;