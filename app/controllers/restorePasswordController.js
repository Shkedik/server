const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'exceed team';
const User = require('../models/user.model');

//запрос на пользователя
module.exports.restorePassword = async function (req, res, error) {
	const { email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const candidate = await User.findOneAndUpdate(
		{ email },
		{ password: bcrypt.hashSync(password, salt) },	//change in this object bcrypt.hashSync(password, salt),
		{ new: true } //update and return this user
	);
	try{
		res.status(201).json(candidate);
	} catch (e) {
		res.status(500).json({
			success: false,
			message: error.message ? error.message : error
		})
	}
};