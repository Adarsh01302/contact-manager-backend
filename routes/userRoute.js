const express = require('express');

const router = express.Router();
const { loginUser, registerUser, currentUser } = require('../controllers/userController.js');
const validateToken = require('../middleware/validateTokenHandler.js');

router.get('/current',validateToken, currentUser)

router.post('/login',loginUser)

router.post('/register' ,registerUser)



module.exports = router;