const express = require('express');
const router = express.Router();
const passport = require('passport');
const messageController = require('../controllers/message_controller');

router.get('/direct',passport.checkAuthentication,messageController.chatPage);
router.get('/direct/t/:id',passport.checkAuthentication,messageController.directChat)

module.exports = router;