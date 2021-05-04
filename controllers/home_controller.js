const Post = require('../models/post');
const User = require('../models/user');

module.exports.index = async (req,res)=>{
   try {
    //    All posts soretd by time at which created at
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user',['name','id','avatar']);
    
    // To get 5 new users
    let users =await User.find({}).sort('-createdAt').limit(5);
    return res.render('home',{title:'home',posts: posts, newUsers: users});
}catch(err){
    console.log('Error in finding posts ',err);
    return res.redirect('back');
}

    
}