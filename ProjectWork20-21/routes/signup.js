const express = require('express');
const db = require("../database/connect");
const router = express.Router();
var sid = null;


router.get('/',function(req,res){
    res.render("signup")
    db.query("SELECT student_id from student where student_id = (select max(student_id) from student);", function (err, value) {
      if (err) throw err;
      console.log(value);
      sid = value[0].student_id;
  
    });
  });
 
router.post('/sisubmit',(req,res)=>{
  let sql = `insert into student() values()`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("ok");
  });
  console.log(`this is the student id ${sid}`);
  let email = req.body.email;
  let password = req.body.password;
  let FirstName = req.body.first_name; 
  let LastName = req.body.last_name; 
  let sqli = `insert into signup values('${email}','${FirstName}','${LastName}','${password}',${sid+1})`;
  db.query(sqli, function (err, result) {
    if (err) throw err;
    console.log("ok");
    console.log(email,password,FirstName,LastName);
  });
  res.redirect('/homepage')
})

module.exports = router;