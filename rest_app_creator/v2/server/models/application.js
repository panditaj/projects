var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    name: String,
    description: String,
    serviceId: String,
    developerId: String
});

var Application = mongoose.model("Application", applicationSchema, "Application");
exports.Application = Application;