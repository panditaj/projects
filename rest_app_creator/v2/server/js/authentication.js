module.exports = function(mongoose, app){

    var User = mongoose.model("User");
    var Developer = mongoose.model("Developer");

    app.post("/login", function (request, response) {

        if (request.body.userType == "user") {
            User.findOne({$and: [
                {username: request.body.inputUsername},
                {password: request.body.inputPassword}
            ]}, function (err, record) {
                if(err){
                    console.log(err);
                }
                if(record){
                    request.session.username = request.body.inputUsername;
                    response.json({goTo: "/userHome"});
                }
                else{
                    response.json({goTo: "/login"});
                }
            });
        }

        else if (request.body.userType == "developer") {
            Developer.findOne({$and: [
                {username: request.body.inputUsername},
                {password: request.body.inputPassword}
            ]}, function (err, record) {
                if(err){
                    console.log(err);
                }

                if(record){
                    request.session.username = request.body.inputUsername;
                    response.json({goTo: "/devHome"});
                }
                else{
                    response.json({goTo: "/login"});
                }
            });
        }
    });

    app.get("/logout", function (request, response) {
        request.session.destroy(function (err) {
            if (err) {
                console.log(err);
                request.session = null;
            }
            else {
                request.session = null;
                response.json({goTo: "/login"});
            }
        });
    });

    app.post("/registerPerson", function (request, response) {
        var roleType = request.body.userType;
        if (roleType == "user") {
            var user = new User(request.body);
            user.save(function (err, record) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(record);
                }
            });
        }
        else if (roleType == "developer") {
            var developer = new Developer(request.body);
            developer.save(function (err, record) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.json(record);
                }
            });
        }
    });

};