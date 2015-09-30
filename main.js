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
    var state = 1;
    addItem(items.length + 1, field.value, state);
    items.push({value: field.value, state: state});
    field.value = '';
    field.focus();
    storestate();
    e.preventDefault();
  }, false);

  todo.addEventListener( 'click', function( e ) {
    var itemId,
        t = e.target;
        itemLi = t.parentNode.parentNode;
    for (var i in todo.childNodes) {
      if (todo.childNodes[i] === itemLi) {
        itemId = i;
        break
      }
    }

    // destroy item in list
    if ( t.className === 'destroy' ) {
      itemLi.remove();
      items.splice(itemId, 1);
      e.preventDefault();
    }

    // toggle checked status
    if ( t.className === 'toggle' ) {
      itemLi.classList.toggle( 'completed' );
      if (items[itemId].state === 1) {
        items[itemId].state = 2;
      } else {
        items[itemId].state = 1;
      }
    }

    storestate();
  }, false);

  // edit list item
  todo.addEventListener( 'dblclick', function( e ) {
    var itemId,
        t = e.target,
        itemLi = t.parentNode.parentNode;

    for (var i = 0; i < todo.childNodes.length; i++) {
      if (todo.childNodes[i] === itemLi) {
        itemId = i;
      }
      if (todo.children[i].classList.contains('editing') === true) {
        todo.children[i].classList.remove('editing');
      }
    }

    if ( t.tagName === 'LABEL' ) {
      var inputEdit = itemLi.querySelector( '.edit' );
      inputEdit.addEventListener( 'keypress', function( ev ) {
        if (ev.which === ENTER_KEY) {
          items[itemId].value = ev.target.value;
          todo.childNodes[itemId].classList.remove('editing');
          storestate();
          console.log(items);
          todo.innerHTML = '';
          retrievestate();
        }
      });
      itemLi.classList.add( 'editing' );
      inputEdit.focus();
    }
  }, false);

  filters.addEventListener( 'click', function( e ) {
    var t = e.target;
    
    if (t.hash === '#/active') {
      filterRedraw(1);
    } else if (t.hash === '#/completed') {
      filterRedraw(2);
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
  });

  clearCompleted.addEventListener( 'click', function( e ) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].state === 2) {
        items.splice(i, 1);
        i--;
      }
    }

    storestate();
    filterRedraw();
    e.preventDefault();
  });

  function filterRedraw (stateView) {
    todo.innerHTML = '';
    retrievestate(stateView);
  }

  // add item to list
  function addItem(count, value, state) {
    var completed = "",
      checked = "";
    if (state === 2) {
      completed = 'completed';
      checked = 'checked';
    }
    todo.innerHTML += '<li class="'+ completed +'"><div class="view"><input id="todolist-item-'+ count +'" class="toggle" type="checkbox" '+ checked +' /><label for="1todolist-item-'+ count +'">' + value + '</label><button class="destroy"></button></div><input type="text" value="'+ value +'" class="edit"></li>';
  }

  // add to localStorage items state
  function storestate() {
    localStorage.todolist = JSON.stringify(items);
  }

  // retrieve from localStorage items state
  function retrievestate(stateView) {
    if ( localStorage.todolist ) {
      items = JSON.parse(localStorage.todolist);
      for (var i = 0; i < items.length; i++) {
        if (stateView == 1 || stateView == 2) {
          if (stateView === items[i].state){
            addItem(i, items[i].value, items[i].state);
          }
        } else {
          addItem(i, items[i].value, items[i].state);
        }
      }
    }
  }
  document.addEventListener( 'DOMContentLoaded', retrievestate(), false );
})();