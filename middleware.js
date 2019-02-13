const jwt = require("jsonwebtoken");
const secret = "mysecret";

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    console.log("Bhupendra sahu");
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        console.log("Hello Bhupendra");
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = withAuth;
