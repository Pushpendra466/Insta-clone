const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true});

const Chats = mongoose.model('Chats',chatSchema);
module.exports = Chats;