module.exports = function(mongoose, app){

    var UserApplicationMap = mongoose.model("UserApplicationMap");
    var User = mongoose.model("User");
    var Application = mongoose.model("Application");

    app.post("/addAppToUser", function(request, response){
        var userId = request.session.username;
        User.findOne({username: userId}, function(userErr, userRecord){
            if(userErr){
                console.log(userErr);
            }
            else{
                var userAppMap = new UserApplicationMap({
                    appId: request.body.id,
                    userId: userRecord._id
                });

                userAppMap.save(function(mapErr, mapRecord){
                    if(mapErr){
                        console.log(mapErr);
                    }
                    else{
                        response.json(mapRecord);
                    }
                });
            }
        });
    });

    app.get("/userAppList", function(request, response){
        if(request.session.username){
            User.findOne({username: request.session.username}, function(userErr, userRecord){
                if(userErr){
                    console.log(userErr)
                }
                else{
                    UserApplicationMap.find({userId: userRecord._id}, 'appId', function(mapErr, mapRecords){
                        if(mapErr){
                            console.log(mapErr);
                        }
                        else{
                            var appIds = [];
                            for(var i = 0; i < mapRecords.length; i++){
                                appIds.push(mapRecords[i].appId);
                            }
                            Application.find({_id: {$in: appIds}}, function(appErr, appRecords){
                                if(appErr){
                                    console.log(appErr);
                                }
                                else{
                                    response.json(appRecords);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    app.delete("/deleteUserApp/:id", function(request, response){
        if(request.session.username){
            User.findOne({username: request.session.username}, function(userErr, userRecord){
                if(userErr){
                    console.log(userErr);
                }
                else{
                    UserApplicationMap.findOneAndRemove({$and: [
                        {appId: request.params.id},
                        {userId: userRecord._id}
                    ]}, function (mapErr, mapRecord) {
                        if(mapErr){
                            console.log(mapErr);
                        }
                        else{
                            response.json(mapRecord);
                        }
                    });
                }
            });
        }
    });

};