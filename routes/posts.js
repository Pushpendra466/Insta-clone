const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');


router.get('/new-post',passport.checkAuthentication,postController.newPost);
router.post('/create',passport.checkAuthentication,postController.createPost);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
router.get('/edit-post-form/:id',passport.checkAuthentication,postController.editForm);
router.post('/edit/:id',passport.checkAuthentication,postController.edit);
router.get('/post-details/:id',passport.checkAuthentication,postController.postDetails);

module.exports = router;