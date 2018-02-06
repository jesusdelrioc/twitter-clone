const mongoose = require("mongoose");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

mongoose.connect('mongodb://localhost/twitter-clone');


User.findOne({ "username": "jesus1" }, (err, user) => {

    let autor = user

const tweets = [
    {
        tweet: "bos dias",
        user_id: autor._id,
        user_name: autor.username
    }, {
        tweet: "boas tardes",
        user_id: autor._id,
        user_name: autor.username
    }, {
        tweet: "boas noites",
        user_id: autor._id,
        user_name: autor.username
    }
]
Tweet.collection.drop()

Tweet.create(tweets, (err, docs) => {
    if (err) {
        throw err
    }
    docs.forEach((tweet) => {
        console.log(tweet.user_name)
    })
    mongoose.connection.close()

});
    
});