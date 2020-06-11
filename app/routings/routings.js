const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registrController = require('../controllers/registrController');
const fileController = require('../controllers/filesController');
const restorePasswordController = require('../controllers/restorePasswordController');
const userDataUpdateController = require('../controllers/userDataUpdateController');
const getDataUser = require('../controllers/userDataUpdateController')

//auth
router.post('/login', loginController.login);
router.post('/register', registrController.register);

//files
router.post('/files/upload', fileController.createFile);
router.get('/files/all', fileController.getAllFiles);
router.get('/files/:id', fileController.getFileById);
router.delete('/files/:id', fileController.removeFile);

//update user profile
router.get('/user/:id', userDataUpdateController.getDataUser)
router.patch('/user/:id', userDataUpdateController.updateDataUser);

//restore password
router.patch('/restore-password', restorePasswordController.restorePassword);

module.exports = router;