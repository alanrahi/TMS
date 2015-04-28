"use strict";
APP.TaskRowView = Backbone.View.extend({
  // the wrapper defaults to div, so only need to set this if you want something else
  // like in this case we are in a table so a tr
  tagName: "div",
  className: "taskDiv",
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
    _.bindAll(this,'destroy');
    this.template = _.template($('#rowTemplate').html());

  },

  // populate the html to the dom
  render: function () {
    console.log('rendering column');
    console.log(this.task);
    //this.$el.html(_.template($('#rowTemplate').html(), this.task.toJSON()));
    this.$el.html(this.template(this.task.attributes));

    return this;
  },

//   this.task.collection.each(function(log){
//     console.log(log);
//     var thing_type = this.model.get("id"),
//     thing_other = this.model.get("instance");

//     console.log(paintThing);
//     console.log(thing_type);
//     console.log(thing_other);
// });

  // delete the model
  destroy: function (event) {
    

    event.preventDefault();
    event.stopPropagation();
    // we would call
    console.log(this);
    //this.trigger('destroy');
    // which would make a DELETE call to the server with the id of the item
    this.collection.remove(this);
    //this.$el.remove();
  },
  

  add: function (event) {
	 
              
      
            this.$('.instances').append('<div class ="instance-div">&nbsp;</div>');
            console.log(this);

            
          

               
            //figure which add button was clicked

            //$('.instances').append('<div> THING </div>');

               

             
  },

  remove: function (event) {
            
            
            this.$('.instances > div:first-child').remove();
            console.log(this);
  }

});









