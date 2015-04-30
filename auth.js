var http = require("http");
var st = require('st');
var Router = require("routes-router");
var router = Router();
//var fs = require('fs');

//var config = require('./config'); //load the orchestrate key
//var db = require('orchestrate')(config.dbKey); // use the key to connect to orch app
// If you're offline, replace the db above with this volatile store:
var db = require('orchestrate')('104d608d-d04c-4328-bffa-9996f19e1e96');

var dbCollection = 'test';

var key = 'alan-04212015';


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
		sendHtml(req, res, templates.login({ message: "<h1>Welcome to Track My Stuff.<h1>"+ "\n" + "<h2>Get ready to track your tasks like a Rock Star</h2>"+ "\n" + "<h2>Please log in.</h2>"}));	
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
		sendHtml(req, res, templates.register({ message: "<h1>Please Create User Account</h1"+"\n"}));	
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
					console.log("Created User: "+user.name)
					// respond with the protected content page, plus a welcome message:
					sendHtml(req, res, templates.thankyou({message: "Thank You "+user.name+"!"}));
				//}
			})
		})//formBody
	}
});

router.addRoute("/api", {
    // Simulate requests with curl:
    // curl localhost:1337/api              --> returns complete db
    // curl localhost:1337/api?keys=1,2,3   --> returns db subset 
	GET:  function(req,res,opts) { //return all or part of a collection

			console.log('processing GET req');
        	db.get(dbCollection, key)
            .then(function(results){
                var data = results.body.currentTaskModel; //this will need to revert to results.body and we will drill down on the client side
                console.log(data);
                res.end(JSON.stringify(data));
            })
            .fail(function(err){
            console.log("error: "+ err);
            
       })
            // // Handle success:
            // function forwardOrchResults(result) {
            //     //given result obj from Orchestrate db, strip away metadata
            //     // and forward the actual model data to client:
            //     var values = result.body.results.map(getValue);
            //     var json = JSON.stringify(values);
            //     console.log("Returning array: "+json);
            //     res.end(json); //return JSON array to client
            // }

            // // Handle failure:
            // function handleFailure(err) {
            //     console.log("Error: "+err);
            //     res.end(err);
            // }

            // console.log("Processing GET request...");
            // console.log("Options:"+JSON.stringify(opts));
            // // parsedURL may include query like this: ?keys=1,2,3-5,6
            // var queryStr = opts.parsedUrl.query;

            // if (queryStr) { // given set of keys, search db for only those...
            //     console.log("queryStr="+queryStr);
            //     var keyStr = getKeysFromQueryString(queryStr);

            //     if (!keyStr) throw "query includes no keys";

            //     // convert keystr to lucene query format...
            //     // turn '1-5' into '[1 TO 5]':
            //     keyStr = keyStr.replace(/(\w+)-(\w+)/g,'[$1 TO $2]')
            //     // turn '1,2,X' into 'key:(1 OR 2 OR X)':
            //                     .replace(/,/g,' OR ');
            //     var searchStr = "value.key:("
            //                     +keyStr
            //                     +")";
            //     console.log("Searching db for "+searchStr);

            //     // return subset of db:
            //     //db.search(dbCollectionName, keyStr)
            //     db.get(dbCollectionName, keyStr) 
            //     // db.newSearchBuilder()
            //     //     .collection(dbCollectionName)
            //     //     .limit(100)
            //     //     .sort('key','asc')
            //     //     .query(searchStr)
            //         .then(forwardOrchResults)
            //         .fail(handleFailure)



            // } else { //no query; return entire db
            //     db.list(dbCollectionName)
            //         .then(forwardOrchResults)
            //         .fail(handleFailure) 
            // }
    },
	POST: function(req,res,opts) { // place a new model into db collection
            console.log("Processing POST request...");
            console.log(JSON.stringify(opts));
            // The model data is stored in request body; must wait for it...
			jsonBody(req,res, function saveBody(err,body) { //when body is ready...
                var key = String(body.key);
                body.id = key;
                console.log("Body:");
                console.log(body);
				db.put(dbCollectionName,key,body) //promise...
        		.then(function(result){
        			res.end(body);
        		})
        		.fail(function(err){
            		console.log("err: "+err);
            		res.end();
        		});

			});
	}
});

router.addRoute("/*", st({
	path: __dirname + "/",
	url: "/"
}));

var server = http.createServer(router);
server.listen(3000);
console.log("example auth server listening on port 3000");
