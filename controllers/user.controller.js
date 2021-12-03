const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");

function signUp(req, res) {
  const userInput = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const schema = {
    name: { type: "string", Optional: false, max: "100" },
    email: { type: "string", Optional: false, max: "100" },
    password: { type: "string", Optional: false, min: "6" },
  };

  const v = new validator();
  const validationresponse = v.validate(userInput, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong",
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function login(req, res) {
  const userInput = {
    email: req.body.email,
    password: req.body.password,
  };
  const schema = {
    email: { type: "string", Optional: false, max: "100" },
    password: { type: "string", Optional: false, min: "6" },
  };

  const v = new validator();
  const validationresponse = v.validate(userInput, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Auth Successful",
                    token: token,
                    
                    user: user,
                  });
                }
              );
            } else {
              res.status(500).json({
                message: "Something went wrong",
              });
            }
          }
        );
      }
    })
    .catch({});
}

module.exports = {
  signUp: signUp,
  login: login,
};
