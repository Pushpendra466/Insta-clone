const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

module.exports.signIn = (req,res)=> {
    return res.render('sign-in',{title:'Sign In'});
}

module.exports.signUp = (req,res)=> {
    return res.render('sign-up',{title:'Sign Up'});
}


module.exports.create = (req,res)=>{
    
    if(req.body.password != req.body.confirm_password){
        
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
           
            return res.redirect('back');
        }
        if(!user){
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    console.log('Error in genrating salt bycrypt',err);
                    return res.redirect('back');
                }
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err){
                        console.log('Error in genrating hash bycrypt',err);
                        return res.redirect('back');
                    }
                    User.create({name: req.body.name,email: req.body.email, password: hash},(err,user)=>{
                        if(err){
                            console.log("Error in creating the new user ",err);
                            return ;
                        }
                        return res.redirect('/users/sign-in');
                    });
                });
            });
           
            
        }else{
            
            return res.redirect('back');
        }
    });
}

module.exports.userProfile =async (req,res) =>{
    try{
        let user = await User.findById(req.params.id);
        let posts = await Post.find({'user': user._id});
        return res.render('user_profile',{title: 'Profile',  profile_user: user, profile_posts: posts});
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.profileEdit = (req,res)=> {
    if(req.params.id == req.user._id){
        return res.render('profile_edit',{title: 'Edit Profile'});
    }
    return res.redirect('back');
}

module.exports.submitProfileEdit = async (req,res)=>{
    if(req.params.id == req.user._id){
        // User.findByIdAndUpdate(req.user._id,req.body,(err,docs)=>{
        //     if(err){
        //         console.log('Error',err);
        //         return res.redirect('back');
        //     }
        //     console.log(docs);
        //     return res.redirect(`/users/profile/${req.user._id}`);
        // })
        try{
            let user = await User.findById(req.user._id);
            User.uploadedAvatar(req,res, (err)=>{
                if(err){
                    console.log('********* Multer Error *******',err);
                }
                user.name = req.body.name;
                user.dateOfBirth = req.body.dateOfBirth;
                user.gender = req.body.gender;
                user.bio = req.body.bio;
                if(req.file){
                    if(user.avatar != '/upload/avatar/default-user-avatar.png'){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect(`/users/profile/${req.user._id}`);
            });

        }catch(err){
            console.log('Error',err);
            return res.redirect('back');
        }
       
    }
}

module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout();
    return res.redirect('/');
}