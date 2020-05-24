module.exports = function(mongoose, app){

    var AppStore = mongoose.model("AppStore");
    var Developer = mongoose.model("Developer");
    var Application = mongoose.model("Application");

    app.post("/publishApp/:id", function(request, response){
        if(request.session.username){

            Developer.findOne({username: request.session.username}, function(err, devRecord){
                if(err){
                    console.log(err);
                }
                else{
                    AppStore.findOne({$and: [{appId: request.params.id}, {devId: devRecord._id}]}, function(err, record){
                        if(err){
                            console.log(err);
                        }

                        if(!record){
                            var appStore = new AppStore({
                                appId: request.params.id,
                                devId: devRecord._id,
                                download: 0
                            });

                            appStore.save(function(errStore, recStore){
                                if(errStore){
                                    console.log(errStore);
                                }
                                else{
                                    response.json({status: true});
                                }
                            });
                        }
                        else{
                            response.json({status: false});
                        }
                    });
                }
            });
        }
    });

    app.post("/unpublishApp/:id", function(request, response){
        if(request.session.username){
            Developer.findOne({username: request.session.username}, function(err, record){
                if(err){
                    console.log(err);
                }
                else{
                    AppStore.findOneAndRemove({$and: [{appId: request.params.id}, {devId: record._id}]}, function(errStore, recStore){
                        if(errStore){
                            console.log(errStore);
                        }
                        else{
                            if(recStore){
                                response.json({status: true});
                            }
                            else{
                                response.json({status: false});
                            }
                        }
                    });
                }
            });
        }
    });

    app.get("/searchApp", function(request, response){
        AppStore.find(function(errStore, recStore){
            if(errStore){
                console.log(errStore);
            }
            else{
                var appIds = [];
                for(var i = 0; i < recStore.length; i++){
                    appIds.push(recStore[i].appId);
                }
                Application.find({_id: {$in: appIds}}, function(appErr, appRecord){
                    if(appErr){
                        console.log(appErr);
                    }
                    else{
                        response.json(appRecord);
                    }
                });
            }
        });
    });
};