/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.taskDescView = Backbone.View.extend({
    el: '#item-description-hold',

    template: _.template($('#item-description').html()),

    events: {
      //'click .destroy': 'clear'
    },

    initialize: function () {
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {


      this.$el.html(this.template(this.model.toJSON()));

      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    }
  });
})(jQuery);
