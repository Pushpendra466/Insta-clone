const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    // console.log(req);
    return res.render('home',{title:'home'});
});


module.exports = router;