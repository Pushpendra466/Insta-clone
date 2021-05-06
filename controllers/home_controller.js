const Post = require('../models/post');
const User = require('../models/user');

module.exports.index = async (req,res)=>{
   try {
    //    All posts soretd by time at which created at
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user',['name','id','avatar'])
    .populate({path : 'comments',
    options: { sort: { createdAt: -1 } },
    populate : {
        path : 'user' ,
        select: ['name','id','avatar'],
    }})
   
    // console.log(posts[0].comments.length)
    // To get 5 new users
    let users =await User.find({}).sort('-createdAt').limit(5);
    return res.render('home',{title:'home',posts: posts, newUsers: users});
}catch(err){
    console.log('Error in finding posts ',err);
    return res.redirect('back');
}

    
}