const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

const port = 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(expressLayouts);
// styles and script for each ejs files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in starting the server : ",err);
    }
    console.log("Server is up and runnig on port : ",port);
})