var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var developerSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    gender: String,
    userType: String
});

var Developer = mongoose.model("Developer", developerSchema, "Developer");
exports.Developer = Developer;