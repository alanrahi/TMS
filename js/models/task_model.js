
"use strict";
APP.TaskModel = Backbone.Model.extend({
  // you can set any defaults you would like here
  defaults: {
    title: "",
    duration: "",
    instance: ""
    
  },

  validate: function (attrs) {
    var errors = {};
    if (!attrs.title) errors.title = "Please Add Task Title";
    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

APP.TaskCollection = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: APP.TaskModel
});
