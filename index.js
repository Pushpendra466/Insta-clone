const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const port = 8080;

const app = express();

// app.get('/home',(req,res)=>{
//     return res.render('home');
// });


app.use(express.static('./assets'));
// app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err){
        console.log("Error in starting the server : ",err);
    }
    console.log("Server is up and runnig on port : ",port);
})