const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      let user = { ...foundUser._doc };
      delete user.password;
      res.status(201).json(user);
    } else {
      res.status(404).json({ error: "Incorrect username or password" });
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.status(200);
  });
});

module.exports = router;