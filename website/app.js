var express = require('express');

var app = express();
var path = require('path');
var data = require('./data.json');

app.use(express.static(path.join(__dirname,'static')));

app.get("/courseList", function (req, res) {
    res.send(Object.keys(data));
})

app.get("/courseReqs", function (req, res) {
    res.send('ToBeImplemented');
})

app.get("/*", function(req, res){
    res.sendFile('views/main.html' , { root : __dirname});
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
})