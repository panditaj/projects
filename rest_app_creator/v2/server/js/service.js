module.exports = function(mongoose, app){

    var Service = mongoose.model("Service");

    app.post("/registerService", function (request, response) {

        if (request.session.username) {
            var service = new Service(request.body);
            service.save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(data);
                }
            });
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.get("/getAPIServices", function (request, response) {
        if (request.session.username) {
            Service.find({}, function (err, services) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(services);
                }
            })
        }
        else {
            response.json({goTo: "/login"});
        }
    });

    app.get("/getService/:id", function(request, response){
        if(request.session.username){
            Service.findOne({_id: request.params.id}, function(err, record){
                if(err){
                    console.log(err);
                }
                else{
                    response.json(record);
                }
            });
        }
    });

    app.post("/updateService", function(request, response){
        if(request.session.username){
            Service.findOneAndUpdate({_id: request.body.id}, request.body.service, function(err, record){
                if(err){
                    console.log(err);
                }
                else{
                    response.json(record);
                }
            });
        }
    });
};