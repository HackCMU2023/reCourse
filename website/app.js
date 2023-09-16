var express = require('express');
var session = require('express-session')
var config = require('dotenv').config();

var google = require('googleapis').google;

var oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET,
  process.env.PROTOCOL + "://" + process.env.DOMAIN + "/oauth2/callback"
);
var auth_url = oauth2Client.generateAuthUrl({
  scope: ["profile", "email"],
  hd: "andrew.cmu.edu"
});

var app = express();
var path = require('path');
var data = require('./data.json');
var similarities = require('./similarities.json');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(express.static(path.join(__dirname,'static')));

app.get("/courseList", function (req, res) {
    res.send(Object.keys(similarities));
})

app.get("/courseRecs", function (req, res) {
    var selectedCourses = req.query.data
    //var selectedCourses = [{course : "15-317", score : 10}, {course : "15-312", score : 8}, {course : "15-213", score : -5}, {course : "15-440", score : -8}]

    var keyValues = []

    for (var key in similarities) {
        if (selectedCourses.map((x) => x.course).includes(key))
            continue

        var avg = 0
        for (var i in selectedCourses) {
            avg += similarities[selectedCourses[i].course][key] * selectedCourses[i].score
        }
        avg/=selectedCourses.length
        keyValues.push([key, avg])
    }

    keyValues = keyValues.sort(function compare(kv1, kv2) {
        return kv2[1] - kv1[1] 
    })

    outputString = "Recommended Courses:"
    for (var i = 0; i < 10; i++) {
        outputString += "<br><br>" + keyValues[i][0] + " " + data.courses[keyValues[i][0]].name + " " + " (similarity: " + keyValues[i][1].toFixed(4) + ")"
        outputString += "<br>" + data.courses[keyValues[i][0]].desc
    }

    res.send(outputString);
})

app.get("/oauth2/callback", function(req, res) {
    var errorHandler = function(error) {
        if (error) {
            console.log("ERROR: " + JSON.stringify(error));
            res.redirect("/error");
        }
    };
    var errorHandlerDummy = function(error) {
        // do nothing
    };
    var emailP = oauth2Client.getToken(req.query.code)
    .then(function(result) {
        return google.oauth2("v2").userinfo.get({
            access_token: result.tokens.access_token
        });
    }).then(function(userinfo) {
        return userinfo.data.email;
    }).catch(errorHandler);

    Promise.all([emailP])
    .then(function(results) {
        var email = results[0];
        req.session.email = email;
        req.session.authenticated = true;

        res.redirect("/");
    }).catch(errorHandlerDummy);
});

app.get("/*", function(req, res){
    if (req.session && req.session.authenticated) {
        res.sendFile('views/main.html' , { root : __dirname});
    } else {
        res.redirect(auth_url);
    }
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
})