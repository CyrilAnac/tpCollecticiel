Vue.component('chat-bubble', {
    data: function () {
        return {
          message: "Coucou, ça va ?"
        }
      },
    template: ' ' +
        '<div class="chat-bubble">' +
        '   <p>{{ message }}</p>' +
        '</div>'
});

// Définition d'un nouveau composant appelé `button-counter`
Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">Vous m\'avez cliqué {{ count }} fois.</button>'
  });


/*new Vue({
    el: '#thomas'
  });*/
  new Vue({ el: '#divbut' })
  
