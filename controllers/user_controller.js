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
        let profileUser = await User.findById(req.params.id);
        let user = await User.findById(req.user._id);
        let posts = await Post.find({'user': profileUser._id}).sort('-createdAt');
        let isFollowed = user.followings.includes(req.params.id); 
        return res.render('user_profile',{title: 'Profile',  profile_user: profileUser, profile_posts: posts ,isFollowed: isFollowed});
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

// To follow any user
module.exports.follow = async (req,res) =>{
    try{
        let user = await User.findById(req.user._id);
        let followUser = await User.findById(req.params.id);

        if(user._id != followUser._id)
        {
            let isFollowed = user.followings.includes(followUser._id);
            let isFollower = followUser.followers.includes(user._id);
            if(!isFollowed && !isFollower)
       { user.followings.push(followUser._id);
        followUser.followers.push(user._id);
        user.save();
        followUser.save();
        }
        }
        return res.redirect('back');
    }catch(err){
        console.log('Error in Follow in userController.js ',err)
        return res.redirect('back');
    }

}

// To unfollow any user
module.exports.unfollow = async (req,res) =>{
    try{
        let user = await User.findById(req.user._id);
        let unFollowUser = await User.findById(req.params.id);
        if(user._id != unFollowUser._id)
        {
            let isFollowed = user.followings.includes(unFollowUser._id);
            let isFollower = unFollowUser.followers.includes(user._id);
            if(isFollowed && isFollower)
       { 
           let followings = user.followings.filter(function(following){
               console.log(following._id,unFollowUser._id,'1st')
              return String(following._id) != String(unFollowUser._id);
           });
           
           user.followings = followings;
           let followers = unFollowUser.followers.filter((follower)=>{
            return  String(follower._id) != String(user._id);
           });
           unFollowUser.followers = followers;
       
        user.save();
        unFollowUser.save();
        }
        }
        return res.redirect('back');
    }catch(err){
        console.log('Error in unfollow userController.js ',err)
    }
}

module.exports.followings = async (req,res) =>{

    try{
        let profileUser = await User.findById(req.params.id).
        populate('followings',['name','avatar']);
        let profileFollowings = profileUser.followings;
        return res.render('followings',{title: 'followings', followings: profileFollowings})
       
    }catch(err){
        console.log('Error in followings userController.js ',err);
        return res.redirect('back');
    }
}

module.exports.followers = async (req,res) =>{

    try{
        let profileUser = await User.findById(req.params.id)
        .populate('followers',['name','avatar']);
        let profileFollowers = profileUser.followers;
        return res.render('followers',{title: 'followers', followers: profileFollowers});
    }catch(err){
        console.log('Error in followers userController.js ',err);
        return res.redirect('back');
    }
}

module.exports.search = async (req,res) =>{
    try{
        let users = [];
        // console.log(req.body.searchBox)
        users = await User.find({$or: [{email: req.body.searchBox},{name: req.body.searchBox}]},{name: 1,email: 1,_id: 1,avatar: 1});
        return res.status(200).json({users})
    }catch(err){
        console.log('Error in searching user ',err)
    }
}