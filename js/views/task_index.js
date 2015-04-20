"use strict";

APP.TaskIndexView = Backbone.View.extend({
  // the constructor
  initialize: function (options) {
    // model is passed through
    this.tasks = options.tasks;
    this.tasks.bind('reset', this.addAll, this);
  },

  // populate the html to the dom
  render: function () {
    this.$el.html($('#indexTemplate').html());
    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
             this.$el.find('#Tasks').children().remove();
             _.each(this.tasks.models, $.proxy(this, 'addOne'));
  },

  addOne: function (task) {
    
          var view = new APP.TaskRowView( {
          tasks: this.tasks, 
          task: task
    
        });
    
    this.$el.find("#Tasks").append(view.render().el);
  
  }

});

