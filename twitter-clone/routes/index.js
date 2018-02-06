const express = require('express');
const router = express.Router();
const Tweet =require('../models/Tweet')

/* GET home page. */
router.get('/', function (req, res, next) {
  user = req.session.currentUser;
  Tweet.find({}, (err, tweets) => {
    res.render('index', { user, tweets });
  })
});

module.exports = router;
