module.exports = function(mongoose, app, http){
    app.post("/apiCall", function (request, response) {

        var Application = mongoose.model("Application");
        var Service = mongoose.model("Service");
        var ApplicationParameterMap = mongoose.model("ApplicationParameterMap");

        var appId = request.body.appId;
        var appInput = request.body.appInput;
        Application.findOne({_id: appId}, function (appErr, appRecord) {

            Service.findOne({_id: appRecord.serviceId}, function (serErr, serRecord) {

                ApplicationParameterMap.find({appId: appRecord._id}).sort({order: 1}).exec(function (paramErr, paramRecords) {

                    var pathParam = "";
                    var queryParam = "";
                    var apiParam = '&' + serRecord.keyLabel + '=' + serRecord.keyValue;
                    for (var i = 0; i < paramRecords.length; i++) {
                        if (paramRecords[i].userVisibility == "no") {
                            pathParam += "/" + paramRecords[i].name;
                        }
                        else {
                            if (appInput.hasOwnProperty(paramRecords[i].name)) {
                                appInput[paramRecords[i].name] = appInput[paramRecords[i].name].replace(/\s/g, "+");
                                queryParam += "&" + paramRecords[i].name + "=" + appInput[paramRecords[i].name];
                            }
                            else {
                                queryParam += "&" + paramRecords[i].name + "=" + paramRecords[i].defaultValue;
                            }
                        }
                    }
                    var options = {
                        host: serRecord.url,
                        port: 80,
                        path: pathParam.toString() + "?" + queryParam.toString() + apiParam,
                        method: "GET"
                    };

                    var req = http.request(options, function (res) {
                        /*
                         console.log('STATUS: ' + res.statusCode);
                         console.log('HEADERS: ' + JSON.stringify(res.headers));
                         */
                        res.setEncoding('utf8');
                        var data = "";
                        res.on('data', function (chunk) {
                            /*
                             console.log('BODY: ' + chunk);
                             */
                            data += chunk;
                        });
                        res.on("end", function () {
                            response.json(JSON.parse(data));
                        });
                    });

                    req.on("error", function (e) {
                        console.log(e.message);
                    });

                    req.write("data\n");
                    req.write("data\n");
                    req.end();

                });
            });
        });
    });
};
