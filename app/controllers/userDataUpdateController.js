const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports.getDataUser = async function (req, res, error) {
	const { id } = req.body;
	const candidate = await User.find({ _id: id });
	try{
		res.status(200).json(candidate);
	} catch(e) {
		res.status(500).json({
			success: false,
			message: error.message ? error.message : error
		})
	}
}

//запрос на пользователя
module.exports.updateDataUser = async function (req, res, error) {
	const { id, email, password, firstName, lastName, avatar } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const candidate = await User.findOneAndUpdate(
		{ _id: id,
			email },
		{ password: bcrypt.hashSync(password, salt),
			firstName,
			lastName,
			avatar },	//change in this object bcrypt.hashSync(password, salt),
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