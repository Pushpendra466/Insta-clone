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

// To delete the post
module.exports.destroy = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            // deleting the post image before deleting the post
            if(post.image_path){
                fs.unlinkSync(path.join(__dirname,'..',post.image_path));
            }
            post.remove();
        }
        return res.redirect('back');
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
    
}

module.exports.editForm = async (req,res)=>{
    let post = await Post.findById(req.params.id);
    return res.render('post_edit',{title: 'Edit Post',post: post});
}

module.exports.edit = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        // Without converting post.user and req.user._id is giving false even it is same
        if(String(post.user) == String(req.user._id)){
            post.caption = req.body.caption;
            post.save();
        }
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.postDetails = async (req,res)=> {
    try{
        let post =  await Post.findById(req.params.id).populate('user');
        return res.render('post_details',{title: 'post Detail',post: post})

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.likePost = async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        let toggleLike = post.likes.includes(req.user._id);
        if(toggleLike){
            post.likes.pull(req.user._id);
            post.save();
            return res.redirect('back')
        }else{
            post.likes.push(req.user._id);
            post.save();
            return res.redirect('back')
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}