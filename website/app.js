var express = require('express');

var app = express();
var path = require('path');
var data = require('./data.json');
var similarities = require('./similarities.json');

app.use(express.static(path.join(__dirname,'static')));

app.get("/courseList", function (req, res) {
    res.send(Object.keys(similarities));
})

app.get("/courseRecs", function (req, res) {
    var selectedCourses = ["15-317", "15-122"]

    var keyValues = []

    for (var key in similarities) {
        if (selectedCourses.includes(key))
            continue
        var avg = 0
        for (var i in selectedCourses) {
            avg += similarities[selectedCourses[i]][key]
        }
        avg/=selectedCourses.length
        keyValues.push([key, avg])
    }

    keyValues = keyValues.sort(function compare(kv1, kv2) {
        return kv2[1] - kv1[1] 
    })

    outputString = "Answers:"
    for (var i = 0; i < 10; i++) {
        outputString += "<br><br>" + keyValues[i][0] + " " + data.courses[keyValues[i][0]].name + " " + " (similarity: " + keyValues[i][1].toFixed(4) + ")"
        outputString += "<br>" + data.courses[keyValues[i][0]].desc
    }

    res.send(outputString);
})

app.get("/*", function(req, res){
    res.sendFile('views/main.html' , { root : __dirname});
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
})