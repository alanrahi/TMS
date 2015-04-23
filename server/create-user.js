var pwd = require("pwd");

module.exports = function(db,collectionName) {
//require must call this function to specify a db and collection name;
// then it returns function createUser:
	return function createUser (name, password) {
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
}

