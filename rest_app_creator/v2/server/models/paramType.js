var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paramTypeSchema = new Schema({
    name: String
});

var ParameterType = mongoose.model("ParameterType", paramTypeSchema, "ParameterType");
exports.ParameterType = ParameterType;