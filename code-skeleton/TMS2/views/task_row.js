"use strict";

APP.TaskRowView = Backbone.View.extend(


  {
        // the wrapper defaults to div, so only need to set this if you want something else
        // like in this case we are in a table so a tr
        

        tagName: "div"
        
    ,

        // functions to fire on events

        events: { 
                    "click a.delete": "destroy",
                    "click a.add": "add"
                }


      ,

        
        // the constructor
        initialize: function(options) { 

                      this.task  = options.task;
                      this.tasks = options.tasks;

                     }
        
        // model is passed through
    
    
      ,

        // populate the html to the dom
  

        render: function() { 

                  this.$el.html(_.template($('#rowTemplate').html(), this.task.toJSON()));
                  return this; 

                 }


      ,

        // delete the model
  

        destroy: function() { 
            
            event.preventDefault();
            event.stopPropagation();
            // we would call
            // this.model.destroy();
            // which would make a DELETE call to the server with the id of the item
            this.tasks.remove(this.task);
            this.$el.remove();
           
           }

      ,
  
        
        add: function(events){  

            //add event listener for plus button

            //figure which add button was clicked

            $('.instances').appendChild('<div> CHOCOLATE!! </div>');

            
            //append a div of #instance to that button's col

            

          } 
  
  });









