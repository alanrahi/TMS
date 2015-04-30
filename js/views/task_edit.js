
"use strict";
APP.TaskEditView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.task  = options.task;
  },


  save: function (event) {
    // this keeps the form from submitting
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.task.set({
      title: this.$el.find('input[name=title]').val(),
      duration: this.$el.find('input[name=duration]').val(),
      //instance: this.$el.find('input[name=instance]').val()
    });
    // we would save to the server here with
    this.task.save();
    // redirect back to the index
    window.location.hash = "tasks/index";

  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.task.toJSON()));
    return this;
  }
});
