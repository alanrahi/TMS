var Router = require("routes-router");
var router = Router();
var http = require("http");
var st = require("st");
var fs = require("fs");
var express = require('express');
var app = express();

var sendHtml = require("send-data/html");
var database = require("./dummydata.js")

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));

app.get('./dummydata.js', function(req, res){
  res.send('hello world');
});

// app.get('/', function(request, response) {
//   //response.send('Hello Alan!');
// });

database.getUser();


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
  //console.log(user);
});

/*var config = require('/config');
var db = require('orchestrate')(config.dbKey);*/

/*router.addRoute('/', function(request, response) {
		fs.readFile('./index.html', {encoding: 'utf8'},
		function (err, data) {
			if (err) console.error(err);

		    sendHtml(request, response, data);

	});
});*/


/*router.addRoute('/', function(request, response) {
	fs.readFile('./js/models/task_model.js', {encoding: 'utf8'},
		function (err, data) {
			if (err) console.error(err);

		    sendHtml(request, response, data);

	});
});*/


/*var server = http.createServer(router);
server.listen(3000);

console.log("listening on port 3000");*/