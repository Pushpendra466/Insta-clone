const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
module.exports = router;