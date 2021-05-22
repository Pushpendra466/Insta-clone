const User = require('../models/user');
const Chats = require('../models/chats');

module.exports.chatPage = async (req,res) =>{
    try{
        let followings = await User.findById(req.user._id).populate('followings',['name','_id','avatar']);
        let followers = await User.findById(req.user._id).populate('followers',['name','_id','avatar']);
        return res.render('chat_page',{title:'inbox | chat',followings: followings, followers: followers})
    }catch(err){
        console.log('Error in chat page ',err)
        return res.redirect('back');
    }
}

module.exports.directChat = async(req,res) =>{
    try{
        let chat_user = await User.findById(req.params.id);
        let chats = await Chats.find({$or: [ { sender:req.user._id,receiver:req.params.id }, {receiver:req.user._id,sender:req.params.id } ]});
        // console.log(chat);
        return res.render('direct_chat',{title:'Direct chat',chat_user,chats})
    }catch(err){
        console.log('Error in direct chat  ',err)
        return res.redirect('back');
    }
}

module.exports.addMessage = async(data)=>{
    // console.log(data);
    Chats.create({
        message: data.message,
        sender: data.sender,
        receiver: data.receiver
    });
}