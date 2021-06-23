const express = require('express');
const db = require("../database/connect");
const router = express.Router();


router.get('/page3',(req,res)=>{
    res.render("page3")
  })
  
  
router.post('/page3s',(req,res)=>{
  
    //insert details of father into family table
  
    let fname = req.body.fname;
    let fdob = req.body.fdob;
    let fqual = req.body.fqual;
    let focu = req.body.focc;
    let fmob = req.body.fmob;
    let femail = req.body.femail;
    console.log(fname,fdob,fqual,focu,fmob,femail);
    let sqlf = `insert into Family values (1,'Father','${fname}','${fdob}',${fmob},'${fqual}','${focu}','${femail}')`
    db.query(sqlf,(err,result)=>{
      if (err) throw err;
      console.log("Inserted");
    });
  
    // insert details of mother into family table
  
    let mname = req.body.mname;
    let mdob = req.body.mdob;
    let mqual = req.body.mqual;
    let mocu = req.body.mocc;
    let mmob = req.body.mmob;
    let memail = req.body.memail;
    console.log(mname,mdob,mqual,mocu,mmob,memail);
    let sqlm = `insert into Family values (1,'Mother','${mname}','${fdob}',${mmob},'${mqual}','${mocu}','${memail}')`
    db.query(sqlm,(err,result)=>{
      if (err) throw err;
      console.log("Inserted");
    });
    res.redirect('/success');
  
    // insert Address
    let prlane = req.body.prlane;
    let prpost = req.body.prpost;
    let prcity = req.body.prcity;
    let prstate = req.body.prstate;
    let pelane = req.body.pelane;
    let pepost = req.body.pepost;
    let pecity = req.body.pecity;
    let pestate = req.body.pepost;
    let sqla = `insert into address values (1,'${prlane}',${prpost},'${prcity}','${prstate}','${pelane}',${pepost},'${pecity}','${pestate}')`
    db.query(sqla,(err,result)=>{
      if (err) throw err;
      console.log("Inserted");
    });
  })
  
module.exports = router;