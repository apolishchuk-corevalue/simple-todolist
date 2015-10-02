/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  var TodoRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'list': 'tasksListView',
      'task/:order': 'taskDescriptionView'
    },

    index: function () {
      console.log('index');

      $('#todoapp').show();
      $('#header').show();
      $('.todoapp-desc').hide();
      $('.to-home').hide();
    },
    taskDescriptionView: function (order) {
      console.log('task description');

      $('#todoapp').hide();
      $('.todoapp-desc').show();
      $('.to-home').show();

      var item = app.todos.findWhere({order: parseInt(order)});
      console.log(order, item);
      if (item) {
        this.taskDescriptionView = new app.taskDescView({model: item}).render();
      } else {
        window.location.hash = 'list';
      }
    },
    tasksListView: function () {
      console.log('list');

      $('#todoapp').show();
      $('#header').hide();
      $('.todoapp-desc').hide();
      $('.to-home').show();
    }
  });

  app.TodoRouter = new TodoRouter();
  Backbone.history.start();
})();
