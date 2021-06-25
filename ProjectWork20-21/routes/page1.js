const express = require('express');
const db = require("../database/connect");
const router = express.Router();
const idsup = require('./signup');
sid = idsup.s_sid;
router.get('/page1',(req,res)=>{
    res.render("page1");
    console.log(sid);
  })
  
router.post('/page1s',(req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let DOB = req.body.dob;
    let gender = req.body.gen;
    let mob_no = req.body.number;
    let email = req.body.email;
    let blood_group = req.body.blo;
    let country = req.body.contry;
    let religion = req.body.releg;
    let category = req.body.cate;
    let adhar = req.body.adhar;
    console.log(fname,lname,DOB,gender,mob_no,email,blood_group,
      country,religion,category,adhar);
      sql = `update student set FirstName = '${fname}',
                                LastName = '${lname}',
                                DOB = '${DOB}',
                                Gender = '${gender}',
                                mobile_no = ${mob_no},
                                Email = '${email}',
                                Nationality = '${country}',
                                blood_group = '${blood_group}',
                                relegion = '${religion}',
                                category = '${category}',
                                Adhar_no = ${adhar}
                                where student_id = 1`
      db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("Inserted succesfully");
      })
    res.redirect('/page2');
  })
  
  module.exports = router;