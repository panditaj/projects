var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    url: String,
    name: String,
    desc: String,
    keyLabel: String,
    keyValue: String
});

var Service = mongoose.model("Service", serviceSchema, "Service");
exports.Service = Service;