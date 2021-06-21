var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var sid = null;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load view engine
app.set('views',path.join(__dirname,'static'));
app.set('view engine','ejs');


var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nikhil",
  database: "project_work"
});
db.connect((err)=>{
  if(err){
      throw err;
  }
  console.log('mysql connected');
});
app.use(express.static('static'))
app.listen(8080);
console.log("Running at Port 8080");
app.get('/',function(req,res){
    res.render("signup")
    db.query("SELECT student_id from student where student_id = (select max(student_id) from student);", function (err, value) {
      if (err) throw err;
      console.log(value);
      sid = value[0].student_id;
  
    });
  });
 
app.post('/sisubmit',(req,res)=>{
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
  res.redirect('/page1')
})



/*
below code collects student personnel deatails
*/


app.get('/page1',(req,res)=>{
  res.sendFile(path.join(__dirname+'/static/page1.html'));
})

app.post('/page1s',(req,res)=>{
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


/**
 Code to collect student academic details
 */
app.get('/page2',(req,res)=>{
  res.sendFile(path.join(__dirname+'/static/page2.html'));
})

app.post('/page2s',(req,res)=>{
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

/**
 * code to collect Family particulers
 */
app.get('/page3',(req,res)=>{
  res.sendFile(path.join(__dirname+'/static/page3.html'))
})


app.post('/page3s',(req,res)=>{

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
db.get


app.get('/success',(req,res)=>{
  res.sendFile(path.join(__dirname+'/static/Registered Successfully.htm'))

})

// Admin page
app.get('/admin',(req,res)=>{
  let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id;`
  db.query(sql,(err,values)=>{
    if (err) throw err;
    res.render("admin",{items:values});
  });
})

app.post('/admin',(req,res)=>{
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
    console.log("debugging output");
    console.log(year);
    let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id and (a.branch='${branch}' and s.email like "19");`
    db.query(sql,(err,values)=>{
    if (err) throw err;
    res.render("admin",{items:values});
  });
  }
})