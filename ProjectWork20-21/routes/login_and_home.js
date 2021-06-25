const express = require('express');
const db = require("../database/connect");
const router = express.Router();
let error = 0;

router.get('/homepage',(req,res)=>{
    res.render("homepage");
    console.log(signup.sid);
  })
  
router.get('/stulogin',(req,res)=>{
    res.render("stulogin",{message : req.flash('message')});
    req.flash('id',5)
  })


router.post('/stulogin',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    req.flash('message','Please check your Email-ID and Password');
    let sql = `select * from stulogin where email`
    res.redirect('/stulogin')
  })
  
router.get('/adminlogin',(req,res)=>{
    res.render("adminlogin");
    let me = req.flash('id')
    console.log(me);
  })

router.get('/success',(req,res)=>{
    res.render("success");
  
  })


module.exports = router;