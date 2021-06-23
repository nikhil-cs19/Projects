const express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

const signup = require("./routes/signup");
const basic = require("./routes/login_and_home");
const admin = require("./routes/admin");
const page1 = require("./routes/page1");
const page2 = require("./routes/page2");
const page3 = require("./routes/page3");


const PORT = process.env.PORT || 5000;
app.listen(5000);
console.log("Running at Port "+PORT);

var sid = null;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load view engine
app.set('views',path.join(__dirname,'static'));
app.set('view engine','ejs');
app.use(express.static('static'));


app.use(signup);
app.use(basic);
app.use(admin);
app.use(page1);
app.use(page2);
app.use(page3);


