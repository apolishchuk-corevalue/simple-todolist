/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  var Todos = Backbone.Collection.extend({
    model: app.taskModel,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    done: function () {
      return this.where({completed: true});
    },

    undone: function () {
      return this.where({completed: false});
    },

    comparator: 'order'
  });

  app.todos = new Todos();
})();
