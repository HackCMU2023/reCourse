var express = require('express');

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname,'static')));

app.get("/*", function(req, res){
    res.sendFile('views/main.html' , { root : __dirname});
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
})