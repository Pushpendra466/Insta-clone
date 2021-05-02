const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/avatar');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '/upload/avatar/default-user-avatar.png'
    },
    gender: {
        type: String,
    },
    bio: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.substring(file.mimetype.lastIndexOf('/')+1, file.mimetype.length);
      cb(null, file.fieldname + '-' + Date.now()+ '.'+ext)
    }
  })

  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;
  


const User = mongoose.model('User',userSchema);
module.exports = User;