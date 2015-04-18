"use strict";

APP.TaskEditView = Backbone.View.extend(

  {
         
         // functions to fire on events
         events: {
			
			"click button.save": "save"

         }



    ,

    	initialize: function(options) { this.task  = options.task; }
	

    ,


         save: function(event) { 

         	this.task.set({
          			title: this.$el.find('input[name=title]').val(),
          			duration: this.$el.find('input[name=duration]').val(),
          			instance: this.$el.find('textarea[name=instance]').val() 
					}
          		)}	

          		 //window.location.hash = "tasks/index";

          		

     
    ,
  

         render: function() { 

         	this.$el.html(_.template($('#formTemplate').html(), this.task.toJSON()));
      		return this;  
      		}


 });
