/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  // Todo Model

  app.taskModel = Backbone.Model.extend({
    defaults: {
      name: '',
      description: '',
      order: '',
      completed: false
    },

    toggle: function () {
      this.save({
        completed: !this.get('completed')
      });
    },

    changeStatus: function (status) {
      this.save({
        completed: status
      });
    },

    // Delete item todo
    delete: function () {
      this.destroy();
    }
  });
})();
