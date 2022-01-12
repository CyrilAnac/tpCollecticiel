
Vue.component("chat-bubble", {
  props: {
    username: String,
    message: Object,
  },
  template:
    " " +
    ' <div v-if="message.username===username"  class="m-2 ms-5"> ' +
    '  <div class="btn btn-primary btn-sm">' +
    "    <p>{{ message.message }}</p>" +
    "  </div>" +
    "  </div>" +
    ' <div v-else class="m-2"> ' +
    "   <div> " +
    '     <span class="title">{{ message.username }}</span>' +
    "  </div>" +
    '  <div class="btn btn-info btn-sm">' +
    "    <p>{{ message.message }}</p>" +
    "  </div>" +
    "</div>",
});


Vue.component("membership-actions", {
  props: {
    joined: Boolean,
  },
  data: function () {
    return {
      username: "",
    };
  },
  template:
    "" +
    '<div class="container chat-controls">' +
    '  <div class="row m-2">' +
    '    <label for="username">Ton pseudo</label>' +
    '    <div class="input-group">' +
    '      <input v-model="username" type="text" id="username" class="form-control validate" :disabled="joined" @keyup.enter="connectAndJoin" autofocus>' +
    '      <div class="input-group-append">' +
    '        <button v-if="!joined" class="btn btn-primary" :disabled="username.length === 0" @click="connectAndJoin">Join</button>' +
    '        <button v-else class="btn btn-primary" @click="handleLeave">Leave</button>' +
    '      </div>' +
    "    </div>" +
    "  </div>" +
    "</div>",
  methods: {
    connectAndJoin: function () {
      this.$emit("connectAndJoin", this.username);
    },
    handleLeave: function () {
      this.$emit("leave");
    },
  },
});


// Définition d'un nouveau composant input pour ecrire et envoyer un message dans la conversation
Vue.component("tab-message", {
  props: {
    inputAllowed: Boolean,
  },
  data: function () {
    return {
      messageText: "",
    };
  },
  template:
    "" +
    '<div class="container tab-message">' +
    '  <div class="input-group m-2">' +
    '      <input v-model="messageText" type="text" placeholder="Entrer un message" class="form-control validate" :disabled="!inputAllowed" @keyup.enter="handleSubmit" autofocus>' +
    '      <div class="input-group-append">' +
      '      <button v-if="!inputAllowed" class="btn btn-primary" :disabled="true" type="button">Envoyer</button>' + // && messageText.length === 0
      '      <button v-else class="btn btn-succes" :enabled="true" @click="handleSubmit" type="button">Envoyer</button>' +
    '      </div>' +
    "  </div>" +
    "</div>",

  methods: {
    handleSubmit: function () {
      this.$emit("submit", this.messageText);
      console.log("J'ai envoyé le message : " + this.messageText);
      this.messageText = "";
    },
  },
});

Vue.component("chat-messages", {
  props: {
    messages: Array,
    user: String
  },
  template:
    "" +
    '<div class="container">' +
    "  <nav>" +
    '    <div id="chat-title" class="nav-wrapper"><span>Messages du chat</span></div>' +
    "  </nav>" +
    '    <div class="container">' +
    '        <chat-bubble v-for="message in messages" :message="message" :username="user"/>' +
    "  </div>" +
    "</div>",
  watch: {
    messages: function () {
      this.$nextTick(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      });
    },
  },
});
