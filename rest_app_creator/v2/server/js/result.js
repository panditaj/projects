module.exports = function (mongoose, app) {

    var ApplicationParameterMap = mongoose.model("ApplicationParameterMap");
    var Developer = mongoose.model("Developer");
    var ApplicationResult = mongoose.model("ApplicationResult");
    var ApplicationResultDataMap = mongoose.model("ApplicationResultDataMap");

    app.get("/testApp/:id", function (request, response) {
        var appId = request.params.id;
        if (request.session.username) {
            ApplicationParameterMap.find({$and: [
                {appId: appId},
                {userVisibility: "yes"}
            ]}, function (err, records) {
                response.json(records);
            });
        }
    });

    app.post("/saveAppResultLevel", function (request, response) {
        if (request.session.username) {
            Developer.findOne({username: request.session.username}, function (devErr, devRecord) {
                if (devErr) {
                    console.log(devErr);
                }
                else {
                    ApplicationResult.findOne({$and: [
                        {appId: request.body.appId},
                        {devId: devRecord._id}
                    ]}, function (resErr, resRecord) {
                        if (resErr) {
                            console.log(resErr);
                        }
                        else {
                            var appResultDataMap = new ApplicationResultDataMap({
                                resultId: resRecord._id,
                                levelNumber: request.body.number,
                                levelName: request.body.name,
                                levelDescription: request.body.description,
                                dataPath: ""
                            });
                            appResultDataMap.save(function (mapErr, mapRecord) {
                                if (mapErr) {
                                    console.log(mapErr);
                                }
                                else {
                                    response.json(mapRecord);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    app.get("/getAppResultLevel/:id", function (request, response) {
        var appId = request.params.id;
        if (request.session.username) {
            Developer.findOne({username: request.session.username}, function (devErr, devRecord) {
                if (devErr) {
                    console.log(devErr);
                }
                else {
                    ApplicationResult.findOne({$and: [
                        {appId: appId},
                        {devId: devRecord._id}
                    ]}, function (resErr, resRecord) {
                        if (resErr) {
                            console.log(resErr)
                        }
                        else {
                            ApplicationResultDataMap.find({resultId: resRecord._id}, function (mapErr, mapRecords) {
                                if (mapErr) {
                                    console.log(mapErr);
                                }
                                else {
                                    response.json(mapRecords);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    app.post("/saveResultLevel", function (request, response) {
        if (request.session.username) {
            ApplicationResultDataMap.update(
                {_id: request.body.resultDataMap._id},
                {$set: {dataPath: request.body.dataPath}}, function (mapErr, mapRecord) {
                if (mapErr) {
                    console.log(mapErr);
                }
                else {
                    response.json(mapRecord);
                }
            });
        }
    });

    app.get("/getResultLevels/:id", function (request, response) {
        if (request.session.username) {
            var appId = request.params.id;
            Developer.findOne({username: request.session.username}, function (devErr, devRecord) {
                if (devErr) {
                    console.log(devErr);
                }
                else {
                    ApplicationResult.findOne({$and: [
                        {appId: appId},
                        {devId: devRecord._id}
                    ]}, function (resErr, resRecord) {
                        if (resErr) {
                            console.log(resErr);
                        }
                        else {
                            ApplicationResultDataMap.find({resultId: resRecord._id}, function (mapErr, mapRecords) {
                                if (mapErr) {
                                    console.log(mapErr);
                                }
                                else {
                                    response.json(mapRecords);
                                }
                            })
                        }
                    });
                }
            });
        }
    });

    app.get("/getLevelDetail/:id", function (request, response) {
        ApplicationResultDataMap.findOne({_id: request.params.id}, function (err, record) {
            if (err) {
                console.log(err);
            }
            else {
                response.json(record);
            }
        });
    });

    app.post("/updateLevelDetail", function (request, response) {
        if (request.session.username) {
            ApplicationResultDataMap.update({_id: request.body.levelId},
                {$set: {levelName: request.body.levelData.levelName,
                levelNumber: request.body.levelData.levelNumber,
                    levelDescription: request.body.levelData.levelDescription}}, function (mapErr, mapRecord) {
                if (mapErr) {
                    console.log(mapErr);
                }
                else {
                    response.json(mapRecord);
                }
            });
        }
    });

    app.delete("/deleteResultLevel/:level", function(request, response){
        if(request.session.username){
            ApplicationResultDataMap.findOneAndRemove({_id: request.params.level}, function(mapErr, mapRecord){
                if(mapErr){
                    console.log(mapErr);
                }
                else{
                    response.json(mapRecord);
                }
            });
        }
    });

};