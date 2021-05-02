const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.get('/sign-in',userController.signIn);
router.get('/sign-out',userController.destroySession);
router.post('/create-session',
passport.authenticate('local',{failureRedirect: '/users/sign-in'}),
userController.createSession);
router.get('/profile/:id',passport.checkAuthentication,userController.userProfile);
router.get('/profile-edit/:id',passport.checkAuthentication,userController.profileEdit);
router.post('/update-profile/:id',passport.checkAuthentication,userController.submitProfileEdit);
router.get('/follow/:id',passport.checkAuthentication,userController.follow);
router.get('/unfollow/:id',passport.checkAuthentication,userController.unfollow);


module.exports = router;