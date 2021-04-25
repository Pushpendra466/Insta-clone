const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

module.exports.newPost = (req,res)=>{
        return res.render('new-post',{title: 'new post'});
}

module.exports.createPost = async (req,res) =>{
  
    try{
       
        Post.uploadedPost(req,res,(err)=>{
            if(err){
                console.log('****** Multer Error *******', err);
            }
            
            if(req.file){
                Post.create({
                    caption : req.body.caption,
                    location: req.body.location,
                    user : req.user._id,
                    image_path : Post.postPath + '/' + req.file.filename
                });
               

            }
            // post.save();
                return res.redirect(`/`);
        })

    }catch(err){
        console.log('Error in creating new post ',err);
        return res.redirect('back');
    }
    
}