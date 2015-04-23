var Router = require("routes-router");
var router = Router();
var http = require("http");
var st = require("st");

//var config = require('/config');
//var db = require('orchestrate')(config.dbKey);

var myUser = require("./dummydata.js")


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello Alan!');
});

var user = myUser.getUser("001");

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
  console.log('hello');
});






var server = http.createServer(router);
server.listen(3000);