/* eslint-disable */
/*
This should only be imported by the "Messages" service
*/
import Vue from 'vue';
import io from 'socket.io-client';
import wildcard from 'socketio-wildcard';
import store from '../store';
import { mapState, mapMutations } from 'vuex';

export default new Vue({
  store,
  created() {
    this.start();
    console.log('socketConnected.created', this.socketConnected);
  },
  data() {
    return {
      socket: undefined,
      subscriptions: {},
      systemEvents: {
        'available-events': this.showAvailableEvents,
      },
    };
  },
  computed: {
    ...mapState({
      socketConnected: state => state.socket.connected,
      socketIp: state => state.socket.ip,
      socketPort: state => state.socket.port,
    }),
  },
  watch: {
    socketConnected(connected) {
      console.log('socketConnected.watch', connected);
    },
  },
  methods: {
    start() {
      if (this.socket !== undefined) {
        this.socket.disconnect();
      }
      console.log(`ws://${this.socketIp}:${this.socketPort}`);
      this.socket = io(`ws://${this.socketIp}:${this.socketPort}`);
      this.socket.on('connect', () => {
        this.send('subscribe', Object.keys(this.subscriptions));
        this.connected();
      });
      this.socket.on('disconnect', this.disconnected);

      // patch our socket so that we can use wildcards
      const patch = wildcard(io.Manager);
      patch(this.socket);

      this.socket.on('*', message => {
        // console.log('Socket.js', 'message', message);
        let type = message.data[0];
        let data = message.data[1];

        if (type === 'message') {
          if (typeof data === 'string') {
            // this is a raw message sent to the socket
            const parsedMessage = JSON.parse(data);
            type = parsedMessage.type;
            data = parsedMessage.data;
          } else {
            // this is an object
            type = data.type;
            data = data.data;
          }
        }

        if (type === 'keydown' || type === 'keyup') {
          // camouflage as windows key eventName
          // Note: can also use $emit * instead, but requires mapping keycode
          // to button namespace, so let's skip that

          this.triggerKeyEvent(type, data.keyCode, data);
        } else {
          this.$emit('*', JSON.stringify({
            type,
            data,
          }));
        }

        // if we need to handle special events, do that here
        if (this.systemEvents[type] !== undefined) this.systemEvents[type](data);
      });

      this.send = (type, data) => {
        try {
          this.socket.send({ type, data });
        } catch (error) {
          /* eslint no-console: 0 */
          console.error('Error sending message to socket. type:', type, 'data:', data);
        }
      };

      this.subscribe = (type) => {
        if (this.subscriptions[type] === undefined) this.subscriptions[type] = 0;
        this.subscriptions[type]++;
        if (this.socketConnected) this.send('subscribe', type);
      };

      this.unsubscribe = (type) => {
        if (this.subscriptions[type] === undefined) return;
        this.subscriptions[type]--;
        if (this.socketConnected && this.subscriptions[type] === 0) this.send('unsubscribe', type);
      };
    },
    ...mapMutations({
      connected: 'CONNECTED',
      disconnected: 'DISCONNECTED',
    }),

    triggerKeyEvent(eventName, keyCode, payload) {
      console.log('Socket.js', 'triggerKeyEvent', eventName, keyCode, payload);
      const e = new KeyboardEvent(eventName, {});
      delete e.keyCode;
      Object.defineProperty(e, 'keyCode', { value: keyCode });
      const keys = Object.keys(payload);
      delete e.detail;
      Object.defineProperty(e, 'detail', { value: {} });
      // define on detail to match with CustomEvent,
      // because properties passed to CustomEvent are also created on detail
      keys.forEach((key) => {
        Object.defineProperty(e.detail, key, { value: payload[key], enumerable: true });
      });
      window.dispatchEvent(e);
    },
    showAvailableEvents(data) {
      // show the available events
      console.info('Available Message Events:', data);
    },
  },
});
