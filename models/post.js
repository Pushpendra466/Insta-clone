const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/upload/posts');

const postSchema = mongoose.Schema({
    caption : {
        type: String
    },
    image_path : {
        type: String,
        required : true
    },
    location : {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Comment' 
  }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
},{timestamps: true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname,'..',POST_PATH))
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.substring(file.mimetype.lastIndexOf('/')+1, file.mimetype.length);
      cb(null, file.fieldname + '-' + Date.now()+ '.'+ext)
    }
  })

  postSchema.statics.uploadedPost = multer({storage: storage}).single('postImage');
  postSchema.statics.postPath = POST_PATH;


const Post = mongoose.model('Post',postSchema);
module.exports = Post;