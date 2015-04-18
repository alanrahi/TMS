"use strict";

//create the class TaskModel
APP.TaskModel = Backbone.Model.extend(

  {
      

      // you can set any defaults you would like here
      defaults: {}


    ,

      
      validate: function() {  }



  });




APP.TaskCollection = Backbone.Collection.extend(

  {
      

      // Reference to this collection's model.
      model: APP.TaskModel


  });
