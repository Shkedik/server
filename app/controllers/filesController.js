const express = require('express');
const FileReader = require('filereader');
const File = require('../models/file.model');

//create new file in bd, type="string"
module.exports.createFile = async (req, res, error) => {
	const { file } = req.body;
	const fileIn = new File({
		file
	});
	try {
		await fileIn.save();
		res.status(201).json(fileIn);
	} catch (e) {
		res.status(500).json({
			success: false,
			message: "Something went wrong...",
		});
	}
};

//get all files from bd, type="string"
module.exports.getAllFiles = async function(req, res, error) {
	try{
		const fileIn = await File.find()
		res.status(200).json(fileIn);
	} catch (e) {
		res.status(500).json({
			success: false, 
			message: error.message ? error.message : error
		})
	}
};

//get file by id
module.exports.getFileById = async function(req, res, error) {
	const { id } = req.body; 
	try{
		const file = await File.findById({
			_id: id
		})
		res.status(200).json(file);
	} catch (e) {
		res.status(500).json({
			success: false, 
			message: error.message ? error.message : error
		})
	}
};

//delet file by id
module.exports.removeFile = async function(req, res) {
	const { id } = req.body;
	try {
		await File.remove({
			_id: id
		})
		res.status(200).json({
			message: "File has been deleted"
		})
	} catch (e) {
		res.status(500).json({
			success: false,
			message: error.message ? error.message : error
		})
	}
};

//get all files from one user by userId
// module.exports.getFileByUser = async function(req, res, error) {
// 	const { user } = req.body; 
// 	try{
// 		const file  = await File.findById({
// 			user
// 		})
// 		res.status(200).json(file);
// 	} catch (e) {
// 		res.status(500).json({
// 			success: false, 
// 			message: error.message ? error.message : error
// 		})
// 	}
// }