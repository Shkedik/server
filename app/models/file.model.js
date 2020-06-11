const mongoose = require('mongoose');
const multer = require('multer');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	file: {
		type: String,
		require: true
	}
});

module.exports = File = mongoose.model('files', fileSchema);