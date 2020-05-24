var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var appStore = new Schema({
    appId: Schema.ObjectId,
    devId: Schema.ObjectId,
    download: Number
});

var AppStore = mongoose.model("AppStore", appStore, "AppStore");
exports.AppStore = AppStore;