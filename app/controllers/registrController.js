const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports.register = async function (req, res) {
	const { email, password, firstName, lastName, avatar } = req.body;
	const candidate = await User.findOne({ email });
	if(candidate) {
		res.status(409).json({ 
			message: 'User with this email registered!' 
		}); 
	} else {
		//создаем пользователя
		const salt = bcrypt.genSaltSync(10);
		const user = new User({
			email,
			password: bcrypt.hashSync(password, salt),
			firstName,
			lastName,
			avatar
		});
		try{
			await user.save();
			res.status(201).json(user);
		} catch(e) {
			res.status(500).json({
				success: false,
				message: error.message ? error.message : error
			})
		}
	}
};
