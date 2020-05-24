var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appParamSchema = new Schema({
    name: String,
    label: String,
    paramType: String,
    dataType: String,
    defaultValue: String,
    format: String,
    order: Number,
    userVisibility: String,
    appId: Schema.ObjectId
});

var ApplicationParameterMap = mongoose.model("ApplicationParameterMap", appParamSchema, "ApplicationParameterMap");
exports.ApplicationParameterMap = ApplicationParameterMap;