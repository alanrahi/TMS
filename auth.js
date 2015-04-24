// Familiar components:
var http = require("http");
var st = require('st');
var Router = require("routes-router");
var router = Router();
//var fs = require('fs');

var config = require('./config'); //load the orchestrate key
var db = require('orchestrate')(config.dbKey); // use the key to connect to orch app
// If you're offline, replace the db above with this volatile store:
//var db = require('./fake-db');


// New components:

// Allow one route to redirect to another:
var redirect = require("redirecter");

// Return html as a response to a client:
var sendHtml = require("send-data/html"); //may also need send-data/json

// Parse the body of a POST request containing a form:
var formBody = require("body/form");

// Pre-compile all the templates in directory server-templates/templates
var templates = require('./compile-templates');

// Allow easy hashing and salting of passwords:
var pwd = require("pwd");
 
// ----- Creating users -----
//uncomment (and customize) to create a user:
var createUser = require('./create-user')(db,"users");
//createUser("steve", "123"); 
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

//****************Create User Function**************

function createUser (name, password) {
		var user = {
			name: name
		};
		// Encode the password with a salt and hash,
		//  and store them with the name in object user:
		pwd.hash(password, function (err, salt, hash) {
			if (err) {
				throw err
			}
			user.salt = salt;
			user.hash = String(hash);

			// Send them to the database collection 'users'
			// with user name as a retrieval key:
			db.put(collectionName, user.name, user)
				.then(function (result) {
					console.log("created user ", user.name)
				})
				.fail(function (err) {
					console.error(err);
				})
		})
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
					sendHtml(req,res, templates.login({ message: "Nope!  Try again."}));

				} else { //successful authentication!
					console.log("authenticated user "+user.name)
					// respond with the protected content page, plus a welcome message:
					sendHtml(req, res, templates.index({message: "Welcome, "+user.name+"!"+user.salt}));
				}
			})//authenticate
		})//formBody
	}
});

//------ Register Route -----------/
router.addRoute("/register", {
	GET: function (req, res, opts) {
		sendHtml(req, res, templates.register({ message: "Please Create User Account"}));	
	},
	

	POST: function (req, res, opts) { //process register form...

		formBody(req, res, function (err, body) { // when form body is ready...
			if (err) {
				// some problem parsing the form...
				return console.log(err);
			}

			// form body is parsed; extract username and password, 
			// then create user account:
			createUser(body.username, body.password, function (err, user) {
				// This function is the callback to which authenticate will provide
				// either an err OR a user
				/*if (err || !user) { //problem
					console.log(err);
					// respond with the login page again, plus a fa ilure message:
					sendHtml(req,res,templates.login({ message: "Nope!  Try again."}));

				} else {*/ //successful register!
					//console.log("Created User: "+user.name)
					// respond with the protected content page, plus a welcome message:
					sendHtml(req, res, templates.thankyou({message: "Thank You "+user.name+"!"}));
				//}
			})
		})//formBody
	}
});

router.addRoute("/*", st({
	path: __dirname + "/",
	url: "/"
}));

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
