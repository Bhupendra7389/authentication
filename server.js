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
const passport = require("passport");
require("./src/passport");

const app = express();

const secret = "mysecret";
app.use(bodyParser.json()).use(morgan());
var cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

const mongo_uri = "mongodb://localhost:27017/react-auth";
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
app.put("/api/comment/:postId", async (req, res) => {
  try {
    const post = await AddUser.findByIdAndUpdate(
      {
        _id: req.params.postId
      },
      { $push: { comments: req.body.comments } },
      {
        new: true
      }
    );
    res.send(post);
  } catch (error) {
    res.status(500);
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/home", function(req, res) {
  res.send("Welcome!");
});

app.get(
  "/api/secret",
  withAuth,

  function(req, res) {
    res.send("You have access to manage this account");
  }
);
app.get("/api/getcomments", async (req, res) => {
  const comm = await AddUser.find({});

  res.send(comm);
});

app.post("/api/register", function(req, res) {
  console.log(JSON.stringify(req.body));
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
app.delete("/api/deleteUser/:postId", async (req, res) => {
  try {
    const post = await AddUser.findByIdAndDelete({
      _id: req.params.postId
    });
    res.send(post);
  } catch (error) {
    res.status(500);
  }
});
app.post("/api/AddUser", function(req, res) {
  debugger;
  console.log("Server" + req.body);
  const adduser = new AddUser();
  adduser.title = req.body.title;
  adduser.name = req.body.name;
  adduser.comment = req.body.comment;
  adduser.age = req.body.age;
  adduser.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      console.log("Welcome User");
    }
  });
});
app.get("/api/getUser", async (req, res) => {
  const post = await AddUser.find({});
  console.log(post);
  res.send(post);
});

app.post("/api/authenticate", function(req, res) {
  console.log("Data" + req.body);
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
            expiresIn: "30 min"
          });
          res.send({ token: token });
          //console.log("token Data" + token);
        }
      });
    }
  });
});

app.get("/checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
