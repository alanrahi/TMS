// Familiar components:
var http = require("http");
var st = require('st');
var Router = require("routes-router");
var router = Router();
var fs = require('fs');

//var config = require('./config'); //load the orchestrate key
//var db = require('orchestrate')(config.dbKey); // use the key to connect to orch app
// If you're offline, replace the db above with this volatile store:
var db = require('./fake-db');


// New components:

// Allow one route to redirect to another:
var redirect = require("redirecter");

// Return html as a response to a client:
var sendHtml = require("send-data/html"); //may also need send-data/json

// Parse the body of a POST request containing a form:
var formBody = require("body/form");

// Pre-compile all the templates in directory server-templates/templates
var templates = require('./server-templates/compile-templates');

// Allow easy hashing and salting of passwords:
var pwd = require("pwd");
 
// ----- Creating users -----
//uncomment (and customize) to create a user:
var createUser = require('./create-user')(db,"users");
createUser("steve", "123"); 
//createUser("testuser","password");

// ----- Authenticating users -----

function authenticate(name, password, callback) {
	db.get('users', name)
		.then(function(result){
			// found user, but still need to check password...
			var user = result.body;
			if (!user)
				// key (name) was found, but user is empty...
				return callback(new Error("empty response"))

			pwd.hash(password, user.salt, function (err, hash) {
				if (err) { //error reconstructing the hash;
									// (probably an invalid or missing salt)
					return callback(err)
				}

				if (String(hash) === user.hash) //success!
					return callback(null, user)
				else
					callback(new Error("invalid password"))
			})
		})
		.fail(function (err) {
			//failed to return user with key of name
			callback(new Error("user not found"));
		});
}

// ----- routes -----

router.addRoute("/", {
	GET: function (req, res, opts) {
		redirect(req,res,"/login");
	}
});

router.addRoute("/logout", {
	GET: function (req, res, opts) {
		redirect(req,res,"/login");
	}
});

router.addRoute("/login", {
	GET: function (req, res, opts) {
		sendHtml(req, res, templates.login({ message: "Please log in"}));	
	/*	sendHtml(req, res,'<h1>Login</h1>\
			<div></div><form method="post" action="/login">\
			<p><label>Username:</label>\
			<input name="username" type="text"> </p>\
			<p> <label>Password:</label>\
          	<input name="password" type="password">\
          	<!--input name="password" type="text"-->\
        	</p>\
        	<p>\
          	<input value="Login" type="submit">\
        	</p>\
      		</form>\
      		<a href="/logout">Log-Out</a>\
			</form>');*/
   /*fs.readFile('/login.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }) //.listen(8000);
});*/
	},
	

	POST: function (req, res, opts) { //process login form...

		formBody(req, res, function (err, body) { // when form body is ready...
			if (err) {
				// some problem parsing the form...
				return console.log(err);
			}

			// form body is parsed; extract username and password, then autherticate:
			authenticate(body.username, body.password, function (err, user) {
				// This function is the callback to which authenticate will provide
				// either an err OR a user
				if (err || !user) { //problem
					console.log(err);
					// respond with the login page again, plus a failure message:
					//sendHtml(req,res,templates.login({ message: "Nope!  Try again."}));

				} else { //successful authentication!
					console.log("authenticated user "+user.name)
					// respond with the protected content page, plus a welcome message:
					sendHtml(req, res, templates.index({message: "Welcome, "+user.name+"!"}));
				}
			})//authenticate
		})//formBody
	}
});

router.addRoute("/register", {
	GET: function (req, res, opts) {
		sendHtml(req, res, templates.register({ message: "Please Create User Account"}));	
	},
	

	POST: function (req, res, opts) { //process login form...

		formBody(req, res, function (err, body) { // when form body is ready...
			if (err) {
				// some problem parsing the form...
				return console.log(err);
			}

			// form body is parsed; extract username and password, then autherticate:
			authenticate(body.username, body.password, function (err, user) {
				// This function is the callback to which authenticate will provide
				// either an err OR a user
				if (err || !user) { //problem
					console.log(err);
					// respond with the login page again, plus a fa ilure message:
					//sendHtml(req,res,templates.login({ message: "Nope!  Try again."}));

				} else { //successful authentication!
					console.log("authenticated user "+user.name)
					// respond with the protected content page, plus a welcome message:
					sendHtml(req, res, templates.index({message: "Welcome, "+user.name+"!"}));
				}
			})//authenticate
		})//formBody
	}
});

router.addRoute("/public/*", st({
	path: __dirname + "/public",
	url: "/public"
}));

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
