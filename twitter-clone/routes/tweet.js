const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tweet = require('../models/Tweet')


/* GET users listing. */
router.get('/new-tweet', function (req, res, next) {
    res.render('form');
});
router.post('/form-tweet', (req, res, next) => {
    const user = req.session.currentUser
    if (err) { return; }

    const newTweet = new Tweet({
        user_id: user._id,
        user_name: user.username,
        tweet: req.body.tweetText
    });

    newTweet.save((err) => {
        if (err) {
            res.render("tweets/new",
                {
                    username: user.username,
                    errorMessage: err.errors.tweet.message
                });
        } else {
            res.redirect("/tweets");
        }
    });
});


module.exports = router;
