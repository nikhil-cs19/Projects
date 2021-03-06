const express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const {check,validationResult} = require('express-validator')

// initial configurations
const PORT = process.env.PORT || 5000;
app.listen(5000);
console.log("Running at Port "+PORT);

var sid = null;
var student = null;
var academic = null;
var father = null;
var mother = null;
var address = null;


const urlencodedParser = bodyParser.urlencoded({ extended: true });
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load view engine
app.set('views',path.join(__dirname,'static'));
app.set('view engine','ejs');
app.use(express.static('static'));
app.use(session({
  secret: 'secret',
  cookie :{maxAge : 3000},
  resave : false,
  saveUninitialized : true
}))
app.use(flash())

// creating connection to database
var mysql = require('mysql');
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

  // Signup Route
app.get('/',function(req,res){
  res.render("signup", {message:"n"})
});


app.post('/', urlencodedParser,(req,res)=>{
  let sql = `insert into student() values()`;
  db.query("SELECT student_id from student where student_id = (select max(student_id) from student);", function (err, value) {
    if (err) throw err;
    console.log(value);
    sid = value[0].student_id;
    sid+=1;
  });
  db.query(sql, function (err, values) {
    if (err) throw err;
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("ok");
      });
      let email = req.body.email;
      let password = req.body.password;
      let FirstName = req.body.first_name; 
      let LastName = req.body.last_name; 
      let sqli = `insert into signup values('${email}','${FirstName}','${LastName}','${password}',${sid})`;
      db.query(sqli, function (err, result) {
        if (err) throw err;
        console.log("ok");
        console.log(email,password,FirstName,LastName);
  });
  res.redirect('/homepage')
  })
})

  // Student login Router
app.get('/stulogin',(req,res)=>{
  res.render("stulogin",{message:"nikhil"})
    });

app.post('/stulogin',urlencodedParser,(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let sql = `select * from signup where Email = '${email}' and password_ = '${password}'`
    db.query(sql, function (err, values) {
      if (err) throw err;
      if(Object.keys(values).length>0){
        console.log(values);
        sid = values[0].student_id;
        res.redirect('/homepage')
      }
      else{
        res.render("stulogin",{message : "Please check Email-ID and password"});
      }
    });
    
  })
  
  //Forgot password page router
  app.get('/forgot',(req,res)=>{
    res.render("for");
  })
  
  //Home page Router
  app.get('/homepage',(req,res)=>{
    res.render("homepage");
  })


// Route to admission page1
app.get('/page1',(req,res)=>{
  res.render("page1");
  console.log(sid);
  console.log(`this is the student id ${sid}`);
})

app.post('/page1',urlencodedParser,(req,res)=>{
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
                              where student_id = ${sid};`
    db.query(sql,(err,result)=>{
      if (err) throw err;
      console.log("Inserted succesfully");
    })
  res.redirect('/page2');
})


//Router to page 2
app.get('/page2',(req,res)=>{
  res.render("page2")
})

app.post('/page2',urlencodedParser,(req,res)=>{
  let moa = req.body.mode;
  let branch = req.body.bran;
  let board10 = req.body.boa10;
  let yop10 = req.body.yop10;
  let percent10 = req.body.perc10;
  let board12 = req.body.boa12;
  let yop12 = req.body.yop12;
  let percent12 = req.body.perc12;
  console.log(moa,branch,board10,yop10,percent10,board12,yop12,percent12);
  let sql = `insert into academic_details values(${sid},'${moa}','${branch}','${board10}',${yop10},${percent10},'${board12}',${yop12},${percent12})`
  db.query(sql,(err,result)=>{
    if (err) throw err;
    console.log("Inserted ssuccesfully");
  })
  res.redirect('/page3')
})



//Router to page3

app.get('/page3',(req,res)=>{
  res.render("page3")
})


app.post('/page3',urlencodedParser,(req,res)=>{

  //insert details of father into family table

  let fname = req.body.fname;
  let fdob = req.body.fdob;
  let fqual = req.body.fqual;
  let focu = req.body.focc;
  let fmob = req.body.fmob;
  let femail = req.body.femail;
  console.log(fname,fdob,fqual,focu,fmob,femail);
  let sqlf = `insert into Family values (${sid},'Father','${fname}','${fdob}',${fmob},'${fqual}','${focu}','${femail}')`
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
  let sqlm = `insert into Family values (${sid},'Mother','${mname}','${fdob}',${mmob},'${mqual}','${mocu}','${memail}')`
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
  let pestate = req.body.pestate;
  let sqla = `insert into address values (${sid},'${prlane}',${prpost},'${prcity}','${prstate}','${pelane}',${pepost},'${pecity}','${pestate}')`
  db.query(sqla,(err,result)=>{
    if (err) throw err;
    console.log("Inserted");
  });
})

//Success page Router
app.get('/success',(req,res)=>{
  let id = sid;
  if (sid==null){
    id= 2;
  }
  console.log(`this is student id ${id}`);
  let sql1 = `select * from student where student_id = ${id};`
  let sql2 = `select * from Academic_Details where student_id = ${id};`
  let sql3 = `select * from Family where student_id = ${id} and Relationship = "Father";`
  let sql4 = `select * from Family where student_id = ${id} and Relationship = "Mother";`
  let sql5 = `select * from Address where student_id = ${id};`
  db.query(sql1,(err,values)=>{
    if (err) throw err;
    student = values;
  });
  db.query(sql2,(err,values)=>{
    if (err) throw err;
    academic = values;
  });
  db.query(sql3,(err,values)=>{
    if (err) throw err;
    father = values;
  });
  db.query(sql4,(err,values)=>{
    if (err) throw err;
    mother = values;
  });
  db.query(sql5,(err,values)=>{
    if (err) throw err;
    address = values;
    console.log(student);
    console.log(academic);
    console.log(father);
    console.log(mother);
    console.log(address);
    res.render("success",{student,academic,father,mother,address});
  });
})

  //Admin login Router
  app.get('/adminlogin',(req,res)=>{
    res.render("adminlogin",{message:"n"});
  })
  
  app.post('/adminlogin',urlencodedParser,(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(email,password);
    let sql = `select * from admin where email = '${email}' and password_ = '${password}'`
    db.query(sql, function (err, values) {
      if (err) throw err;
      if(Object.keys(values).length>0){
        console.log(values);
        res.redirect('/admin')
      }
      else{
        res.render("adminlogin",{message : "Please check Email-ID and password"});
      }
    });
    
  })

// Admin page Router
app.get('/admin',(req,res)=>{
  let sql = `select s.FirstName,s.LastName,s.Email, s.student_id,a.branch from signup s, Academic_Details a where s.student_id = a.student_id;`
  db.query(sql,(err,values)=>{
    if (err) throw err;
    res.render("admin",{items:values});
  });
})

app.post('/admin',urlencodedParser,(req,res)=>{
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



//Admin Student Router
app.get('/admstu',(req,res)=>{
  id = req.query.id;
  console.log(`required id = ${id}`);
  let sql1 = `select * from student where student_id = ${id};`
  let sql2 = `select * from Academic_Details where student_id = ${id};`
  let sql3 = `select * from Family where student_id = ${id} and Relationship = "Father";`
  let sql4 = `select * from Family where student_id = ${id} and Relationship = "Mother";`
  let sql5 = `select * from Address where student_id = ${id};`
  db.query(sql1,(err,values)=>{
    if (err) throw err;
    student = values;
  });
  db.query(sql2,(err,values)=>{
    if (err) throw err;
    academic = values;
  });
  db.query(sql3,(err,values)=>{
    if (err) throw err;
    father = values;
  });
  db.query(sql4,(err,values)=>{
    if (err) throw err;
    mother = values;
  });
  db.query(sql5,(err,values)=>{
    if (err) throw err;
    address = values;
    console.log(student);
    console.log(academic);
    console.log(father);
    console.log(mother);
    console.log(address);
    res.render("admstu",{student,academic,father,mother,address});
  });
})