const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location : String,
    age : Number

},{
    versionKey : false
})

let userModel = mongoose.model("user",userSchema)

module.exports = {userModel}