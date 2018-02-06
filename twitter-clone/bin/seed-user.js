const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/User");

mongoose.connect('mongodb://localhost/twitter-clone');

const salt= bcrypt.genSaltSync(bcryptSalt);
const password ="1234";
const encrypted= bcrypt.hashSync(password, salt);

const users = [
    {
        username:"jesus",
        password: encrypted
    },{
        username:"ana",
        password: encrypted
    },{
        username:"alvaro",
        password: encrypted
    }
]
User.collection.drop()

User.create(users, (err, docs) => {
    if(err){
        throw err
    }
    docs.forEach((user)=>{
        console.log(user.username)
    } )
    mongoose.connection.close()
});