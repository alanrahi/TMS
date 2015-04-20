"use strict";


APP.TaskNewView = Backbone.View.extend(

  {
          

          // functions to fire on events
          events: {"click button.save": "save"}

      , 

          // the constructor
          initialize: function(options) {
            
            this.task = options.task;
            this.tasks = options.tasks;
            this.task.bind('invalid', this.showErrors, this);

          }


      ,


          showErrors: function() {

            this.$el.find('.error').removeClass('error');
            this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
            
            // highlight the fields with errors

            _.each(_.keys(errors), _.bind(function (key) {
              
                this.$el.find('*[name=' + key + ']').parent().addClass('error');
                }, this));
             }


      ,


          save: function() { 
          
              // update our model with values from the form
              this.task.set({
                  
                  title: this.$el.find('input[name=title]').val(),
                  duration: this.$el.find('input[name=duration]').val(),
                  instance: this.$el.find('input[name=instance]').val(),
      
                  // just setting random number for id would set as primary key from server
      
                  id: Math.floor(Math.random() * 100) + 1

                });
          
              if (this.task.isValid()){
              
              // add it to the collection
                  
                  this.tasks.add(this.task);
                  // this.task.save();
              
              // redirect back to the index
              
                  window.location.hash = "tasks/index";
                 
                 }
   
    }        
      ,

          // populate the html to the dom
          render: function() { 

              this.$el.html(_.template($('#formTemplate').html(), this.task.toJSON()));
              return this;    

           }


  });
