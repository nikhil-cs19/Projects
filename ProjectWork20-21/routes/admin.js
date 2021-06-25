const express = require('express');
const db = require("../database/connect");
const router = express.Router();

router.get('/admin',(req,res)=>{
    let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id;`
    db.query(sql,(err,values)=>{
      if (err) throw err;
      res.render("admin",{items:values});
    });
  })

router.post('/admin',(req,res)=>{
    let branch = req.body.branch;
    let year = req.body.year;
    console.log(year);
    console.log(branch);
    if (branch=="" && year==""){
      let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id;`
      db.query(sql,(err,values)=>{
      if (err) throw err;
      res.render("admin",{items:values});
    });
    }
    else if(branch==""){
      year = year.slice(2,4);
      console.log(year);
      let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id and s.Email like "%${year}%";`
      db.query(sql,(err,values)=>{
      if (err) throw err;
      res.render("admin",{items:values});
    });
    }
    else if(year==""){
      let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id and a.branch='${branch}';`
      db.query(sql,(err,values)=>{
      if (err) throw err;
      res.render("admin",{items:values});
    });
    }
    else if(year!="" && branch!=""){
      year = year.slice(2,4);
      console.log(typeof year);
      console.log("debugging output");
      console.log(year);
      let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id and (a.branch='${branch}' and s.email like "%${year}%");`
      db.query(sql,(err,values)=>{
      if (err) throw err;
      res.render("admin",{items:values});
    });
    }
  })

  module.exports = router;