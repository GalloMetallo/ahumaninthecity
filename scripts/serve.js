var express = require('express');
var app = express();

//setting middleware
app.use(express.static(  '../www')); //Serves resources from public folder


var server = app.listen(5000);
console.log("app is serving on http://localhost:5000")