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

      this.changeVisibleElements();
      $('#header').show();
    },
    taskDescriptionView: function (order) {
      console.log('task description');

      $('#todoapp').hide();
      $('#item-description-hold').show();

      var item = app.todos.findWhere({order: parseInt(order)});
      if (item) {
        this.taskDescriptionView = new app.taskDescView({model: item}).render();
      } else {
        window.location.hash = 'list';
      }
    },
    tasksListView: function () {
      console.log('list');
      this.changeVisibleElements();
      $('#header').hide();
    },

    changeVisibleElements: function () {
      $('#todoapp').show();
      $('#item-description-hold').hide();
    }
  });

  app.TodoRouter = new TodoRouter();
  Backbone.history.start();
})();
