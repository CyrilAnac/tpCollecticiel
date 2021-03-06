
Vue.component("chat-room-comp", {
  data: function () {
    return {
      domain: null,
      room: null,
      messages: [],
      username: null
    };
  },
  template:
    "" +
    "<div>" +
    '  <membership-actions :joined="room != null" @connectAndJoin="handleConnect" @leave="handleLeave" />' +
    '  <div class="chat-container">' +
    '    <chat-messages :messages="messages" :user="username" />' +
    '    <tab-message :input-allowed="room != null" @submit="handleMessageSubmission" />' +
    "  </div>" +
    "</div>",
  methods: {
    handleConnect: function (username) {
      Convergence.connectAnonymously(DOMAIN_URL, username)
        .then((d) => {
          this.domain = d;
          return this.domain.chat().create({
            id: "group-chat",
            type: "room",
            membership: "public",
            ignoreExistsError: true,
          });
        })
        .then((channelId) => {
          this.username = username;
          return this.domain.chat().join(channelId)
        })
        .then(this.handleJoin)
        .catch((error) => {
          console.log("Could not join chat room: " + error);
        });
    },
    handleJoin: function (room) {
      this.room = room;

      // listen for a new message added to this room
      room.on("message", this.appendMessage);
      // fetch the 25 most recent messages
      room
        .getHistory({
          limit: 25,
          // only return events of type "message"
          eventFilter: ["message"],
        })
        .then((response) => {
          response.data.slice().reverse().forEach((event) => {
            this.appendMessage(event);
          });
        });
    },
    appendMessage: function (event) {
      let messages = this.messages.slice(0);
      messages.push({
        username: event.user.displayName,
        message: event.message,
        timestamp: event.timestamp,
      });
      // don't mutate the array, replace it
      this.messages = messages;
    },
    handleMessageSubmission: function (messageText) {
      try {
        this.room.send(messageText);
      } catch (e) {
        // handle errors.  say, the user isn't currently connected
        this.displayError(e);
      }
    },
    handleLeave() {
      this.room.leave().then(() => {
        this.room = null;
        this.messages = [];
        return this.domain.dispose();
      });
    },
    displayError(msg, detail) {
      // use the materialize toast
      if (detail) {
        M.toast({ html: "<h3>" + msg + "</h3><p>" + detail + "</p>" });
      } else {
        M.toast({ html: msg });
      }
    },
  },
});


new Vue({
  el: "#chat-room",
});