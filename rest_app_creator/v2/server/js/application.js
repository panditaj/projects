module.exports = function(mongoose, app){

    var Developer = mongoose.model("Developer");
    var Application = mongoose.model("Application");
    var ApplicationResult = mongoose.model("ApplicationResult");
    var AppStore = mongoose.model("AppStore");

    app.get("/getApplications", function (request, response) {
        if (request.session.username) {
            Developer.findOne({username: request.session.username}, function (err, record) {
                Application.find({developerId: record._id}, function (err, records) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        response.json({applications: records});
                    }
                });
            });
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.post("/registerApp", function (request, response) {
        if (request.session.username) {
            Developer.findOne({username: request.session.username}, function (err, record) {
                var application = new Application({
                    name: request.body.name,
                    description: request.body.description,
                    serviceId: request.body.api._id,
                    developerId: record._id
                });
                application.save(function (err, appRecord) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var applicationResult = new ApplicationResult({
                            devId: appRecord.developerId,
                            appId: appRecord._id
                        });
                        applicationResult.save(function (err, appResultRecord) {
                            if(err){
                                console.log(err);
                            }
                            else{
                                response.json(appRecord);
                            }
                        });
                    }
                });
            });
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.delete('/deleteApp/:id', function (request, response) {
        if (request.session.username) {
            var id = request.params.id;
            Application.findOneAndRemove({_id: id}, function (err, appRecord) {
                if (err) {
                    console.log(err);
                }
                else {
                    ApplicationResult.findOneAndRemove({appId: id}, function (err, appResultRecord) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            response.json(appRecord);
                        }
                    });
                }
            })
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.get("/getAppList", function(request, response){
        if(request.session.username){
            Application.find(function(err, records){
                if(err){
                    console.log(err);
                }
                else{
                    response.json(records);
                }
            });
        }
    });

};