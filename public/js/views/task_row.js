"use strict";
APP.TaskRowView = Backbone.View.extend({
  // the wrapper defaults to div, so only need to set this if you want something else
  // like in this case we are in a table so a tr
  tagName: "div",
  // functions to fire on events
  events: {
    "click a.delete": "destroy",
    "click a.add": "add",
    "click a.petitedelete": "remove"
	 },


  // the constructor
  initialize: function (options) {
    // model is passed through
    this.task  = options.task;
    this.tasks = options.tasks;
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#rowTemplate').html(), this.task.toJSON()));
    return this;
  },

  // delete the model
  destroy: function (event) {
    event.preventDefault();
    event.stopPropagation();
    // we would call
    // this.model.destroy();
    // which would make a DELETE call to the server with the id of the item
    this.tasks.remove(this.task);
    this.$el.remove();
  },
  
  add: function (event) {
	 
              
      
            this.$('.instances').append('<div class ="instance-div"> xxxx </div>');
            console.log(this);
            
          

               
            //figure which add button was clicked

            //$('.instances').append('<div> THING </div>');

               

             
  },

  remove: function (event) {
            
            
            this.$('.instances > div:first-child').remove();
            console.log(this);
  }
});
