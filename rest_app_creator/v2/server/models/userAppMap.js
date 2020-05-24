var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userAppMap = new Schema({
    userId: Schema.ObjectId,
    appId: Schema.ObjectId
});

var UserApplicationMap = mongoose.model("UserApplicationMap", userAppMap, "UserApplicationMap");
exports.UserApplicationMap = UserApplicationMap;