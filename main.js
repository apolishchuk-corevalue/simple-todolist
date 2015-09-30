/**
 * Created by apolishchuk on 29.09.2015.
 */
 var ENTER_KEY = 13;

(function(){

  var todo = document.querySelector( '.todo-list' ),
      form = document.querySelector( 'form' ),
      field = document.querySelector( '.new-todo'),
      filters = document.querySelector( '.filters'),
      clearCompleted = document.querySelector('.clear-completed'),
      items = [];

  // add todoitem
  form.addEventListener( 'submit', function( e ) {
    var completed = false;
    addItem(items.length + 1, field.value, completed);
    items.push({value: field.value, completed: completed});
    field.value = '';
    field.focus();
    storestate();
    e.preventDefault();
  }, false);

  todo.addEventListener( 'click', function( e ) {
    var t = e.target,
        itemLi = t.parentNode.parentNode,
        itemId = itemLi.getAttribute('data-index');
    todo.children[itemId].classList.remove('editing');

    // destroy item in list
    if ( t.className === 'destroy' ) {
      itemLi.remove();
      items.splice(itemId, 1);
      e.preventDefault();
    }

    // toggle checked status
    if ( t.className === 'toggle' ) {
      itemLi.classList.toggle( 'completed' );
      items[itemId].completed = !items[itemId].completed;
    }

    storestate();
  }, false);

  // edit list item
  todo.addEventListener( 'dblclick', function( e ) {
    var t = e.target,
        itemLi = t.parentNode.parentNode,
        itemId = itemLi.getAttribute('data-index');
    todo.children[itemId].classList.remove('editing');

    if ( t.tagName === 'LABEL' ) {
      var inputEdit = itemLi.querySelector( '.edit' );
      inputEdit.addEventListener( 'keypress', function( ev ) {
        if (ev.which === ENTER_KEY) {
          items[itemId].value = ev.target.value;
          todo.childNodes[itemId].classList.remove('editing');
          storestate();
          todo.innerHTML = '';
          drawList();
        }
      });
      itemLi.classList.add( 'editing' );
      inputEdit.focus();
    }
  }, false);

  filters.addEventListener( 'click', function( e ) {
    var t = e.target;
    
    if (t.hash === '#/active') {
      filterRedraw(false);
    } else if (t.hash === '#/completed') {
      filterRedraw(true);
    } else {
      filterRedraw();
    }
    aFilters = filters.querySelectorAll('a');
    for (var i = 0; i < aFilters.length; i++) {
      if(aFilters[i].classList.contains('selected')) {
        aFilters[i].classList.remove('selected');
      }
    }
    t.classList.add('selected');

    e.preventDefault();
  }, false);

  clearCompleted.addEventListener( 'click', function( e ) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].completed === true) {
        items.splice(i, 1);
        i--;
      }
    }

    storestate();
    filterRedraw();
    e.preventDefault();
  }, false);

  function filterRedraw (completed) {
    todo.innerHTML = '';
    drawList(completed);
  }

  // draw list
  function drawList(completed) {
    for (var i = 0; i < items.length; i++) {
      if (typeof completed !== 'undefined') {
        if (completed === items[i].completed){
          addItem(i, items[i].value, items[i].completed);
        }
      } else {
        addItem(i, items[i].value, items[i].completed);
      }
    }
  }

  // add item to list
  function addItem(count, value, completed) {
    var complete = "",
      checked = "";
    if (completed === true) {
      complete = 'completed';
      checked = 'checked';
    }
    todo.innerHTML += '<li data-index="'+ count +'" class="'+ complete +'"><div class="view"><input class="toggle" type="checkbox" '+ checked +' /><label>' + value + '</label><button class="destroy"></button></div><input type="text" value="'+ value +'" class="edit"></li>';
  }

  // add to localStorage items state
  function storestate() {
    localStorage.todolist = JSON.stringify(items);
  }

  // retrieve from localStorage items state
  function retrievestate() {
    if ( localStorage.todolist ) {
      items = JSON.parse(localStorage.todolist);
    }
  }
  document.addEventListener( 'DOMContentLoaded', function( e ) {
    retrievestate();
    drawList();
  }, false );
})();