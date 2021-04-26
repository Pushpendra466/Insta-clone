const Post = require('../models/post');
module.exports.index = async (req,res)=>{
    // Post.find({},(err,posts)=>{
    //     if(err){
    //         console.log('Error in finding posts ',err);
    //         return res.redirect('back');
    //     }
    //     return res.render('home',{title:'home',posts: posts});
    // })

   try {
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user');
    return res.render('home',{title:'home',posts: posts});
}catch(err){
    console.log('Error in finding posts ',err);
    return res.redirect('back');
}

    
}