
"use strict";
APP.TaskShowView = Backbone.View.extend({
  // the constructor
  initialize: function (options) {
    this.task = options.task;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#showTemplate').html(), this.task.toJSON()));
    return this;
  }
});

