/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.taskListItemView = Backbone.View.extend({
    tagName:  'li',

    template: _.template($('#item-template').html()),

    events: {
      'click .toggle': 'toggleCompleted',
      'click .destroy': 'clear'
    },

    initialize: function () {
      this.listenTo(this.model, 'add', this.render);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));

      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    },
    
    toggleCompleted: function () {
      this.model.toggle();
      this.$el.toggleClass('completed', this.model.get('completed'));
    },

    clear: function () {
      this.model.delete();
    }

  });
})(jQuery);
