module.exports = function(mongoose, app){

    var ApplicationParameterMap = mongoose.model("ApplicationParameterMap");
    var ParameterType = mongoose.model("ParameterType");
    var ParameterDatatype = mongoose.model("ParameterDatatype");

    app.post("/registerParam", function (request, response) {
        if (request.session.username) {
            var appParamMap = new ApplicationParameterMap(request.body);
            appParamMap.save(function (err, record) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(record);
                }
            });
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.post("/getParams", function (request, response) {
        if (request.session.username) {
            ApplicationParameterMap.find({appId: request.body.appId}, function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(records);
                }
            });
        }
    });

    app.delete('/deleteParam/:id', function (request, response) {
        if(request.session.username){
            var id = request.params.id;
            if (request.session.username) {
                ApplicationParameterMap.findOneAndRemove({_id: id}, function (err, record) {
                    response.json(record);
                });
            }
        }
    });

    app.get("/getParam/:id", function (request, response) {
        if(request.session.username){
            var id = request.params.id;
            if (request.session.username) {
                ApplicationParameterMap.findOne({_id: id}, function (err, record) {
                    response.json(record);
                });
            }
        }
    });

    app.get("/getParamTypes", function (request, response) {
        if (request.session.username) {
            ParameterType.find(function (err, records) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(records);
                }
            });
        }
    });

    app.get("/getParamDataTypes", function (request, response) {
        if (request.session.username) {
            ParameterDatatype.find(function (err, records) {
                if(err){
                    console.log(err);
                }
                else{
                    response.json(records);
                }
            });
        }
    });

    app.post("/updateParam", function (request, response) {
        if(request.session.username){
            var id = request.body.id;
            var param = request.body.param;
            if (request.session.username) {
                ApplicationParameterMap.findOneAndUpdate({_id: id}, param, function (err, record) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        response.json(record);
                    }
                });
            }
        }
    });

    app.post("/loadParameterOptions", function(request, response){
        var paramDatatypes = ["Text", "Number", "Date", "Enum"];
        var paramTypes = ["Path", "Query"];

        ParameterDatatype.remove(function(errParam, recordParam){
            if(errParam){
                console.log(errParam);
            }
        });

        ParameterType.remove(function(errParam, recordParam){
            if(errParam){
                console.log(errParam);
            }
        });

        var i;
        for(i = 0; i < paramDatatypes.length; i++){
            var paramDatatype = new ParameterDatatype({
                name: paramDatatypes[i]
            });
            paramDatatype.save(function(err, record){
                if(err){
                    console.log(err);
                }
            });
        }

        for(i = 0; i < paramTypes.length; i++){
            var paramType = new ParameterType({
                name: paramTypes[i]
            });
            paramType.save(function(err, record){
                if(err){
                    console.log(err);
                }
            });
        }

        response.json({});
    });

};