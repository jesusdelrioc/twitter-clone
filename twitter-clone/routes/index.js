var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  user=req.session.currentUser;
  res.render('index', {user});
});

module.exports = router;
