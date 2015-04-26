var st = require('st');
var http = require('http');

var Router = require("routes-router");
var router = Router(); 

// Body parsing:
var jsonBody = require('body/json');
// Query parsing:
var querystring = require('querystring');

// Database access:
var config = require('./config.js'); //should include key to your Orch app
var db = require('orchestrate')(config.dbKey);
// You'll need a collection called 'count' within your Orch app
var dbCollectionName = 'users'; // which db collection to use

//helper function to extract values from Orchestrate responses:
function getValue(obj) {
    var val = obj.value;
    val.id = val.key;
    return val;
}

function getKeysFromQueryString(queryStr) {
    // return the string after "keys="
    //return queryStr.slice(5);
    // more versatile:
    return querystring.decode(queryStr).keys;
    }

// routes:


router.addRoute("/api", {
    // Simulate requests with curl:
    // curl localhost:1337/api              --> returns complete db
    // curl localhost:1337/api?keys=1,2,3   --> returns db subset 
	GET:  function(req,res,opts) { //return all or part of a collection

            // Handle success:
            function forwardOrchResults(result) {
                //given result obj from Orchestrate db, strip away metadata
                // and forward the actual model data to client:
                var values = result.body.results.map(getValue);
                var json = JSON.stringify(values);
                console.log("Returning array: "+json);
                res.end(json); //return JSON array to client
            }

            // Handle failure:
            function handleFailure(err) {
                console.log("Error: "+err);
                res.end(err);
            }

            console.log("Processing GET request...");
            console.log("Options:"+JSON.stringify(opts));
            // parsedURL may include query like this: ?keys=1,2,3-5,6
            var queryStr = opts.parsedUrl.query;

            if (queryStr) { // given set of keys, search db for only those...
                console.log("queryStr="+queryStr);
                var keyStr = getKeysFromQueryString(queryStr);

                if (!keyStr) throw "query includes no keys";

                // convert keystr to lucene query format...
                // turn '1-5' into '[1 TO 5]':
                keyStr = keyStr.replace(/(\w+)-(\w+)/g,'[$1 TO $2]')
                // turn '1,2,X' into 'key:(1 OR 2 OR X)':
                                .replace(/,/g,' OR ');
                var searchStr = "value.key:("
                                +keyStr
                                +")";
                console.log("Searching db for "+searchStr);

                // return subset of db:
                db.search(dbCollectionName, keyStr)
                // db.newSearchBuilder()
                //     .collection(dbCollectionName)
                //     .limit(100)
                //     .sort('key','asc')
                //     .query(searchStr)
                    .then(forwardOrchResults)
                    .fail(handleFailure)

            } else { //no query; return entire db
                db.list(dbCollectionName)
                    .then(forwardOrchResults)
                    .fail(handleFailure) 
            }
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


// The static route pattern (/*) includes /api, so it should be listed second
router.addRoute("/*", st({
  path: __dirname + "/",
  index:'/index.html'
}));


var server = http.createServer(router);
console.log('server listening on port # 1337');
server.listen(1337);