/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';

  app.TasksListView = Backbone.View.extend({
    el: '#todoapp',

    events: {
      'click #create-todo': 'createTodo',
      'click #mark-toogle': 'toggleAllComplete',
      'click #delete-all': 'deleteAll',
      'click #clear-completed': 'clearCompleted'
    },

    initialize: function () {
      this.allCheckbox = $('#mark-toogle-input')[0];
      this.$input = this.$('#new-todo');
      this.$inputDescription = this.$('#new-todo-description');
      this.$list = $('#todo-list');

      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'change:completed', this.filterOne);
      this.listenTo(app.todos, 'filter', this.filterAll);
      this.listenTo(app.todos, 'reset', this.addAll);

      app.todos.fetch({reset: true});
    },

    render: function () {

    },

    addOne: function (todo) {
      var view = new app.taskListItemView({ model: todo });
      this.$list.append(view.render().el);
      this.$input.focus();
    },

    addAll: function () {
      this.$list.html('');
      app.todos.each(this.addOne, this);
    },

    createTodo: function () {
      console.log(app.todos);
      var name = (this.$input.val().trim() != false) ? this.$input.val().trim() : '';
      var desc = (this.$inputDescription.val().trim() != false) ? this.$inputDescription.val().trim() : '';
      if (name != false && desc != false) {
        app.todos.create({
          name: name,
          description: desc,
          order: app.todos.length ? app.todos.last().get('order') + 1 : 1,
          completed: false
        });
        this.$input.val('');
        this.$inputDescription.val('');
      } else {
        // message about empty input
        var tId,
            $smg = $('#header .message.error');

        $smg.show();
        clearTimeout(tId);
        tId = setTimeout(function(){
          $smg.hide();
        }, 3000);
      }
      return false;
    },

    deleteAll: function () {
      _.invoke(app.todos.where(), 'destroy');
      app.todos.reset();
      return false;
    },

    clearCompleted: function () {
      _.invoke(app.todos.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      this.allCheckbox = $('#mark-toogle-input')[0];
      this.allCheckbox.checked = !this.allCheckbox.checked;
      var completed = this.allCheckbox.checked;

      app.todos.each(function (todo) {
        todo.save({
          completed: completed
        });
      });
      return false;
    }
  });
})(jQuery);
