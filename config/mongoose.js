const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/insta_clone_dev",{ useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongodb"));

db.once('open',()=>{
    console.log("********** Connected to database Mongodb ************")
});

module.exports = db;