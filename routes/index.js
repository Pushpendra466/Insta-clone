const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    // console.log(req);
    return res.render('home',{title:'home'});
});
router.use('/users',require('./users'));

module.exports = router;