var database = {

"001" : { "firstname" : "alan",
		     "lastname" : "rahi",
		     "username" : "alanrahi",
		     "location" : "portland",
		     "password" : {"salt" : 7 ,
						   "hash" : "oreughawg8w30wfu0w9fuf3"}

		 },
				  
"tasks" : [			 	
									{ "date" : 04212014,
									  "hi" : 76,
  								  	  "low" : 48,
  								      "precip" : 3	
									  "currentTaskModel" : {

										   "task1" : { "taskname" : "cigarettes",
										   				"instances" : 4,
										   				"duration" : 5
													  },

										   "task2" : { "taskname" : "blunts",
										   				"instances" : 4,
										   				"duration" : 10
													  },

										   "task3" : { "taskname" : "martinis",
										   				"instances" : 5,
										   				"duration" : 10
													 }	
																					}
									},
									//second item in the array , aka index 1
									{ "date" : 04212014,
								      "hi" : 76,
								  	  "low" : 48,
								      "precip" : 3	
								      "currentTaskModel" : {

										   "task1" : { "taskname" : "cigarettes",
										   				"instances" : 4,
										   				"duration" : 5
													  },

										   "task2" : { "taskname" : "blunts",
										   				"instances" : 4,
										   				"duration" : 10
													  },

										   "task3" : { "taskname" : "martinis",
										   				"instances" : 5,
										   				"duration" : 10
													 }	
																					}
								},

									{ "date" : 04212014,
							          "hi" : 76,
							  	      "low" : 48,
							      	  "precip" : 3	
							          "currentTaskModel" : {

										   "task1" : { "taskname" : "cigarettes",
										   				"instances" : 4,
										   				"duration" : 5
													  },

										   "task2" : { "taskname" : "blunts",
										   				"instances" : 4,
										   				"duration" : 10
													  },

										   "task3" : { "taskname" : "martinis",
										   				"instances" : 5,
										   				"duration" : 10
													 }	
																					}
									}
			]					


								    
								

												  			    		  	    

/*values associated with a user: firstname, lastname, username,
password, location */

/* values associated with a task: 
*/

/* values associated with a day: hi, low, precipitation

*/





}	

module.exports = {

//provide the ID and the data and return all userdata for that day that is required for display to the DOM

	getUser = function(ID) {

		var myUser = database["ID"];

		 

		return: myUser;




	};








}


	

























}