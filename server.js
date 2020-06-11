const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
require('./app/routings/routings');

const server = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://Alexandra:restart987@cluster0-k46rv.mongodb.net/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false 
})	.then(() => console.log('MongoDB connected.'))
		.catch(	err => console.log(err));

server.use(multer({dest:'/files'}).single('file'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '50mb'}));
server.use('/', require('./app/routings/routings'));
server.use(cors());

server.listen(PORT, () => {
	console.log(`Server has been started on ${PORT}`);
	})
