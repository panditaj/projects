var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appResultDataSchema = new Schema({
    resultId: Schema.ObjectId,
    levelNumber: Number,
    levelName: String,
    levelDescription: String,
    dataPath: String
});

var ApplicationResultDataMap = mongoose.model("ApplicationResultDataMap", appResultDataSchema, "ApplicationResultDataMap");
exports.ApplicationResultDataMap = ApplicationResultDataMap;