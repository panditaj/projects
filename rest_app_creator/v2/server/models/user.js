var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    gender: String,
    userType: String
});

var User = mongoose.model("User", userSchema, "User");
exports.User = User;