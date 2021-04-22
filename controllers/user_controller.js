const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    console.log(hash);
                   
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

module.exports.userProfile = (req,res) =>{
    // res.render('user_profile',{title: 'Profile'});
    User.findById(req.params.id,(err,user)=>{
        if(err){
            console.log('Error in finding the user profile ',err)
            return res.redirect('back');
        }
        return res.render('user_profile',{title: 'Profile',  profile_user: user});
    })
}

module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout();
    return res.redirect('/');
}