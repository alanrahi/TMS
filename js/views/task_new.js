
"use strict";
APP.TaskNewView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.task  = options.task;
    this.tasks = options.tasks;
    this.task.bind('invalid', this.showErrors, this);
    console.log("clicked create task button");
  },

  showErrors: function (task, errors) {
    this.$el.find('.error').removeClass('error');
    this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
    // highlight the fields with errors
    _.each(_.keys(errors), _.bind(function (key) {
      this.$el.find('*[name=' + key + ']').parent().addClass('error');
    }, this));
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();
    // update our model with values from the form
    console.log('console logging this.task');
    console.log(this.task);
    var date = new Date();
    var time = date.getMilliseconds().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var year = date.getFullYear().toString();
    var currentDate = router.getCurrentDate();
    //console.log(currentDate);
    //var currentDate = toString(date.getMonth())+"-"+toString(date.getDate())+"-"+toString(date.getFullYear());
    console.log(currentDate);
    this.task.set({
      title: this.$el.find('input[name=title]').val(),
      duration: this.$el.find('input[name=duration]').val(),
      date: currentDate,
      time: time
      //instance: this.$el.find('input[name=instance]').val(),
      // just setting random number for id would set as primary key from server
      //id: Math.floor(Math.random() * 100) + 1
    });
    if (this.task.isValid()){
      console.log('model is valid, adding to collection');
      // add it to the collection
      this.tasks.add(this.task);
      this.task.save();
      // redirect back to the index
      console.log('logging result of isValid after hitting save button');
      console.log(this); 
     
      
      
      window.location.hash = "tasks/index";
      var divCountForWidthChanger = divCountForWidthChanger++;
    }

  },

  // populate the html to the dom
  render: function () {

    this.$el.html(_.template($('#formTemplate').html(), this.task.toJSON()));

    return this;
  }

});
