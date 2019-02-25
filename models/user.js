const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 100
	},
	email: {
		type: String,
		required: true,
		minlength: 7,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		maxlength: 1024
	},
	created: {
		type: Date,
		default: Date.now()
	}
});
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({_id: this._id, name: this.name}, config.get('jwtPrivateKey'));
	return token;
}
const User = mongoose.model('User', userSchema);

validateUser = (user) => {
	const schema = {
		name: Joi.string().min(5).max(100).required(),
		email: Joi.string().min(7).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	}

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;