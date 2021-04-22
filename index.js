const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratgy');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const port = 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/upload', express.static(__dirname+'/upload'));
// styles and script for each ejs files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'insta_clone',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({ mongoUrl:db._connectionString, 
        autoRemove:'disabled' },
        (err)=>{
            console.log(err||'connect-mongo setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in starting the server : ",err);
    }
    console.log("Server is up and runnig on port : ",port);
})