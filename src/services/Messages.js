/* eslint no-console: 0 */
/*
This service expects that string messages come in JSON format with the following params:
@param type {String} - Type of message (pass "*" to receive all types)
@param data {Number | String | Object | Array} (Optional) - Data that goes along with the message
*/

import Vue from 'vue';
import Socket from './Socket';
import Keyboard from './Keyboard';

export default new Vue({
  created() {
    // hijack the listener
    const oldOn = this.$on;
    this.$on = (...args) => {
      console.log(':::::::::');
      // if the first argument is *, then we emit all events to this callback
      if (args[0] === '*') {
        const index = this.wildcardListeners.indexOf(args[1]);
        if (index === -1) {
          this.wildcardListeners.push(args[1]);
        }
      } else {
        Socket.subscribe(args[0]);
      }

      oldOn.apply(this, args);
    };

    const oldOff = this.$off;
    this.$off = (...args) => {
      // if the first argument is *, then we kill the callback
      if (args[0] === '*') {
        const index = this.wildcardListeners.indexOf(args[1]);
        if (index !== -1) {
          this.wildcardListeners.splice(index, 1);
        }
      } else {
        Socket.unsubscribe(args[0]);
      }

      oldOff.apply(this, args);
    };

    // listen to socket messages
    Socket.$on('*', (data) => {
      // // put the source of the message in the payload
      // if (data.payload === undefined) data.payload = {};
      // data.payload.messageSource = 'Socket';

      // // go ahead and emit the event now
      // this.$emit(data.type, data.data, data.payload);

      // // also emit it to the listeners that wanted to know about it
      // this.wildcardListeners.forEach((callback) => {
      //   callback(data.type, data.data, data.payload);
      // });
      this.parseMessage(data, 'Socket');
    });

    // listen to keyboard presses
    Keyboard.$on('*', (data) => {
      this.parseMessage(data, 'Keyboard');
    });
  },
  data() {
    return {
      wildcardListeners: [],
    };
  },
  methods: {
    parseMessage(jsonStr, source) {
      // try {
      const msg = JSON.parse(jsonStr);
      if (msg.type === undefined) {
        // well that ain't good
        console.error('parseMessage missing "type" param in raw message:', jsonStr);
        return;
      }

      // put the source of the message in the payload
      if (msg.payload === undefined) msg.payload = {};
      msg.payload.messageSource = source;

      // go ahead and emit the event now
      this.$emit(msg.type, msg.data, msg.payload);

      // also emit it to the listeners that wanted to know about it
      this.wildcardListeners.forEach((callback) => {
        callback(msg.type, msg.data, msg.payload);
      });
      // } catch (error) {
      //   console.error('JSON parsing error on:', src, 'Error:', error, 'Raw:', jsonStr);
      //   this.$emit('error', `JSON parsing error on "${src}": ${error} -- Raw: ${jsonStr}`);
      // }
    },
    send(type, data) {
      // console.log('socket send(type, data)', type, data);
      Socket.send(type, data);
    },
    setConfig(uid, config) {
      if (typeof uid !== 'symbol') return;
      Keyboard.setConfig(uid, config);
    },
    restoreConfig(uid) {
      if (typeof uid !== 'symbol') return;
      Keyboard.restoreConfig(uid);
    },
  },
});
