const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

router.get('/',passport.checkAuthentication,homeController.index);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/message',require('./message'));

module.exports = router;