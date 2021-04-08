const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication using passport
passport.use(new localStrategy({
    usernameField: 'email'
},
    (email, password, done) =>{
        //find a user and establish the identity
        User.findOne({email: email},(err,user)=>{
            if(err){
                // console.log('Error in finding the user ---> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid Username/Password");
                // req.flash('error', 'Invalid Username/Password')
                return done(null,false);
            }
            return done(null,user);
        })
    }
));

//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
});


//Deserializing the user from the key in the cookies
passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        if(err){
            console.log('Error in finding the user ---> Passport');
                return done(err);
        }
        return done(null,user);
    });
});

// Check if User is authenticated 

passport.checkAuthentication = (req,res,next)=>{
// if the user is authenticated then pass on the request to the next function (Controller's function)
    if(req.isAuthenticated()){
        return next();
    }
// if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated){
        /* req.user contains the current signed-in user 
         for the session cookie and we are just sending this to the locals for the views */
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;