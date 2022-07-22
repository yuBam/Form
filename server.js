const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var mysql = require("mysql");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
app.set("view engine", "ejs");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "015210529649",
  database: "tutorial",
});
module.exports = con;
var data;

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.pass;
  console.log(username);
  console.log(password);
  for (let entryindex = 0; entryindex < data.length; entryindex++) {
    if (
      data[entryindex]["Email"] == username &&
      data[entryindex]["password"] == password
    ) {
      res.send("Succesfull login");
    } else if (
      data[entryindex]["userName"] == username &&
      data[entryindex]["password"] == password
    ) {
      res.send("Succesfull login");
    }
  }
  res.send("falsches Password");
});

router.get("/login", function (req, res) {
  res.render("login.ejs");
});

app.get("/", function (req, res) {
  var res;
  con.query("SELECT * FROM benutzer", function (err, result, fields) {
    if (err) throw err;
    data = result;
    res.render("users.ejs", { result: result });
  });
});

router.get("/test", function (req, res) {
  res.render("form.ejs");
});

router.post("/test", function (req, res, next) {
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var birthdate = req.body.birthdate;
  var gender = req.body.gender;
  var email = req.body.email;
  var pass = req.body.pass;

  console.log("Connected!");
  var sql = `INSERT INTO benutzer(userName, FirstName, LastName, BirthDate, Gender, Email, password) VALUES('${username}', '${firstname}', '${lastname}','${birthdate}', '${gender}', '${email}', '${pass}')`;
  var age = calculateAge(new Date(birthdate));
  console.log(age);

  if (age < 18) {
    res.send("nah bro");
  } else {
    con.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log("1 record inserted");
    });
    res.send("ok");
  }

  res.redirect("/");
});

app.listen(3001, () => {
  console.log("Started on PORT adad3000");
});

// functions
function calculateAge(date) {
  const now = new Date();
  const diff = Math.abs(now - date);
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return age;
}
