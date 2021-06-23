const express = require('express');
const db = require("../database/connect");
const router = express.Router();

router.get('/page2',(req,res)=>{
    res.render("page2")
  })
  
router.post('/page2s',(req,res)=>{
    let moa = req.body.mode;
    let branch = req.body.bran;
    let board10 = req.body.boa10;
    let yop10 = req.body.yop10;
    let percent10 = req.body.perc10;
    let board12 = req.body.boa12;
    let yop12 = req.body.yop12;
    let percent12 = req.body.perc12;
    console.log(moa,branch,board10,yop10,percent10,board12,yop12,percent12);
    let sql = `insert into academic_details values(1,'${moa}','${branch}','${board10}',${yop10},${percent10},'${board12}',${yop12},${percent12})`
    db.query(sql,(err,result)=>{
      if (err) throw err;
      console.log("Inserted ssuccesfully");
    })
    res.redirect('page3')
  })

  module.exports = router;