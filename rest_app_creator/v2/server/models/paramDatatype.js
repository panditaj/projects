var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paramDatatypeSchema = new Schema({
   name: String
});

var ParameterDatatype = mongoose.model("ParameterDatatype", paramDatatypeSchema, "ParameterDatatype");
exports.ParameterDatatype = ParameterDatatype;