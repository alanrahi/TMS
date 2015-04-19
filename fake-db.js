var _store = {
	testuser: { //demo user with "password"
                "name": "testuser",
                "salt": "5+KHjfzNR6v0ZC2ZJA0nYLVqmNdnoXnIGQpdewvlQiWFokZxb8WWXooVtoeCC/AAhg4fMDMQQ9RamaDdz06CLIcG9f2dSPYxY+PR8R4cR9mRqYzImqQVzy/tet4KEy1acLz8dn0aXjCCgj96xV79N2WRxwRpTsCU1c4M8W5AI+w=",
                "hash": "+d+NSOsPooyy7abEIdRp5zkAw0IoasmFQ/F7+whkWqK5NB4WvaobMfvw2eq0Bi4Jl1Qh1240xtXzVtZ4xvI+T3lYGz766M9W8QK5oODRSIqBdnFG1SfPKD/kcDO0zymEj4hdtjoL5dL237VT6KO3AWrYxdJZr/YD6ZnQcyfJoTk="
            }
};

var db = {
	// fake a get request:
	get: function(collection, username) {
		var result = _store[username],
			promise = {},
			ok = result || false;
		promise.then = function(cb) {
			if (ok)
				cb({body:result});
			return promise;
		};
		promise.fail = function(cb) {
			if (!ok)
				cb("doh!");
			return promise;
		};
		return promise;
	},
	// fake a put request:
	put: function(collection, username, user) {
		_store[username] = user;
		var promise = {},
			ok = true; //always ok
		promise.then = function(cb) {
			if (ok)
				cb("ok");
			return promise;
		};
		promise.fail = function(cb) {
			if (!ok)
				cb("doh!")
			return promise;
		};
		return promise;
	},
	// for debugging only:
	list: function() {
		console.log(_store);
	}
}

module.exports = db;