var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appResultSchema = new Schema({
    devId: Schema.ObjectId,
    appId: Schema.ObjectId
});

var ApplicationResult = mongoose.model("ApplicationResult", appResultSchema, "ApplicationResult");
exports.ApplicationResult = ApplicationResult;