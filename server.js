var Router = require("routes-router");
var router = Router();
var http = require("http");
var st = require("st");
var fs = require("fs");

var sendHtml = require("send-data/html");

/*var config = require('/config');
var db = require('orchestrate')(config.dbKey);*/

router.addRoute('/', function(request, response) {
	fs.readFile('./index.html', {encoding: 'utf8'},
		function (err, data) {
			if (err) console.error(err);

		    sendHtml(request, response, data);

	});
});


router.addRoute('/', function(request, response) {
	fs.readFile('./js/models/task_model.js', {encoding: 'utf8'},
		function (err, data) {
			if (err) console.error(err);

		    sendHtml(request, response, data);

	});
});




var server = http.createServer(router);
server.listen(3000);

console.log("listening on port 3000");