const express = require('express');
const db = require("../database/connect");
const router = express.Router();

router.get('/homepage',(req,res)=>{
    res.render("homepage");
    console.log(signup.sid);
  })
  
router.get('/stulogin',(req,res)=>{
    res.render("stulogin");
  })
  
router.get('/adminlogin',(req,res)=>{
    res.render("adminlogin");
  })

router.get('/success',(req,res)=>{
    res.render("success");
  
  })

module.exports = router;