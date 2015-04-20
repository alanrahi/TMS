"use strict";
window.APP = window.APP || {};
APP.TaskRouter = Backbone.Router.extend({
  routes: {
    "task/new": "create",
    "tasks/index": "index",
    "task/:id/edit": "edit",
    "task/:id/view": "show"
  },

  initialize: function (options) {
    this.tasks = options.tasks;
    this.index();
  },

  create: function () {
    this.currentView = new APP.TaskNewView({
      tasks: this.tasks, task: new APP.TaskModel()
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var task = this.tasks.get(id);
    this.currentView = new APP.TaskEditView({task: task});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var task = this.tasks.get(id);
    this.currentView = new APP.TaskShowView({
      task: task
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new APP.TaskIndexView({
      tasks: this.tasks
    });
    $('#primary-content').html(this.currentView.render().el);
    // we would call to the index with
    // this.tasks.fetch()
    // to pull down the index json response to populate our collection initially
  }
});
