const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const AddUser = require("./models/AddUser");
const withAuth = require("./middleware");

const app = express();

const secret = "mysecret";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()).use(morgan());
app.use(cookieParser());

const mongo_uri = "mongodb://localhost:27017/react-auth";
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

app.get("/api/secret", withAuth, function(req, res) {
  res.send("You have access to manage this account");
});
// app.use("/api/logout", function(req, res) {
//   Cookie.remove("token", { path: "http://localhost:3000" });
// });

app.post("/api/register", function(req, res) {
  const { First_Name, Last_Name, email, password } = req.body;
  const user = new User({ First_Name, Last_Name, email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send(user);
    }
  });
});
app.post("/api/AddUser", function(req, res) {
  console.log(res.body);
  const adduser = new AddUser();
  adduser.title = req.body.title;
  adduser.name = req.body.name;
  adduser.comment = req.body.comment;
  adduser.age = req.body.age;
  adduser.adduser.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send(user);
    }
  });
});

app.post("/api/authenticate", function(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password"
      });
    } else {
      // debugger;
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password"
          });
        } else {
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "2min"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
