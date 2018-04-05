/**
 * There are several events about Keyboard (and this is related with Remote Controller).
 *
 * "button_down"        : While a button is pressed, this emits 'button_down' event repeatedly.
 * "button_up"          : When a button is released, this emits 'button_up' event.
 * "button_spress"      : If a button is pressed and released in 'repeatDelay' , this emits 'button_spress' event.
 * "button_lpress_once" : If a button is being pressed, and the duration is over than 'repeatDelay', this emits 'button_lpress_once' event.
 * "button_lpress_down" : If a button is being pressed, and the duration is over than 'repeatDelay',
 *                        this emits 'button_lpress_down' event repeatedly (interval is 'repeatInterval')
 * "button_lpress_up"   : If a button is being pressed over than 'repeatDealy' and then the button is released, this emits 'button_lpress_up' event.
 */

import Vue from 'vue';
export const KEY_CODES = {
  // dpad
  SELECT: 13,
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,

  // remote control (2016 buttons set)
  VOLUME_UP: 65, // A
  VOLUME_DOWN: 90, // Z
  SMART_HUB: 72, // H
  MUTE: 77, // M
  POWER: 80, // P
  CHANNEL_UP: 33, // Pg Up
  CHANNEL_DOWN: 34, // Pg Down
  BACK: 82, // R
  EXIT: 69, // E
  VOICE: 86, // V
  NUMPAD: 78, // N
  PLAY: 112, // F1
  GUIDE: 71, // G
  EXTRA: 88, // X
  SETTINGS: 83, // S
  CHANNEL_LIST: 76, // L
  // used for demo on windows since there is no 220 'back slash' button on windows :(
  TOGGLE: 84, // T
  // TOGGLE2: 89, // Y
  TOGGLE: 220, // \
  TOGGLE2: 191, // /
  NOTIFICATION: 16, // Shift - used for Eden Mobile production demo
  VOICE_SEARCH: 66, // B
  // app launching

  // global functions
  SOURCE: 81, // Q
  PLUGIN: 85, // U new source/device pluged-in (historically USB)

  // numbers
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,

  // config setting
  TOGGLE_CONFIG_SETTING: 68, // D

  //
  DASH: 189,
};

const NO_REPEAT_KEYS = {
  POWER: false, // when set to true it's pressed and won't be dispatched again
};

export default new Vue({
  data() {
    return {
      cachedEvent: null,
      keyDown: false,
      longPressOnce: false,
      repeatDelay: 0,
      repeatInterval: 0,
      map: {
        default: {
          repeatDelay: 350,
          repeatInterval: 108,
        },
        order: ['default'],
      },
    };
  },
  created() {
    window.addEventListener('keydown', this.handleKeys, false);
    window.addEventListener('keyup', this.handleKeys, false);
    this.repeatDelay = this.map.default.repeatDelay;
    this.repeatInterval = this.map.default.repeatInterval;
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeys, false);
    window.removeEventListener('keyup', this.handleKeys, false);
  },
  methods: {
    handleKeys(event) {
      Object.keys(KEY_CODES).forEach(name => {
        if (event.keyCode === KEY_CODES[name]) {
          // check to see if this key is not allowed to repeat
          if (NO_REPEAT_KEYS[name] !== undefined) {
            if (NO_REPEAT_KEYS[name] && event.type === 'keydown') return;
            NO_REPEAT_KEYS[name] = event.type === 'keydown';
          }

          const eventOwner = event.detail;
          if (!eventOwner) {
            delete event.detail;
            Object.defineProperty(event, 'detail', { value: {} });
          }

          if (event.type === 'keydown' && !this.keyDown) {
            // console.log('keydown');
            this.$emit(name);
            this.$emit('*', JSON.stringify({ type: 'button_down', data: name, payload: event.detail }));
            this.toLongpress(name);
            this.keyDown = true;
            this.cachedEvent = event;
          } else if (event.type === 'keyup') {
            // console.log('keyup');
            this.$emit(name);
            if (this.longPressOnce) {
              this.$emit('*', JSON.stringify({ type: 'button_lpress_up', data: name, payload: event.detail }));
            } else {
              this.$emit('*', JSON.stringify({ type: 'button_spress', data: name, payload: event.detail }));
            }
            this.$emit('*', JSON.stringify({ type: 'button_up', data: name, payload: event.detail }));
            this.cancelLongpress();
            this.cachedEvent = null;
          }

          // F1~F12 are function keys that trigger system action of a browser.
          // It will prevent to bubble an event up to a system event queue.
          if (event.keyCode >= 112 && event.keyCode <= 123) {
            event.preventDefault();
          }
        }
      });
    },
    toLongpress(name) {
      clearTimeout(this.timeout);
      clearTimeout(this.timeoutLongpress);
      this.timeout = setTimeout(() => this.longpressCallback(name), this.repeatDelay);
    },
    cancelLongpress() {
      this.keyDown = false;
      this.longPressOnce = false;
      clearTimeout(this.timeout);
      clearTimeout(this.timeoutLongpress);
    },
    longpressCallback(name) {
      if (!this.longPressOnce) {
        this.$emit('*', JSON.stringify({ type: 'button_lpress_once', data: name, payload: this.cachedEvent.detail }));
        this.longPressOnce = true;
      }
      this.$emit('*', JSON.stringify({ type: 'button_lpress_down', data: name, payload: this.cachedEvent.detail }));
      this.timeoutLongpress = setTimeout(() => this.longpressCallback(name), this.repeatInterval);
    },
    setConfig(uid, config) {
      const obj = {};
      obj.repeatDelay = config.repeatDelay || this.repeatDelay;
      obj.repeatInterval = config.repeatInterval || this.repeatInterval;
      if (this.map.order.includes(uid)) {
        this.map.order.splice(this.map.order.indexOf(uid), 1);
      }
      this.map.order.push(uid);
      this.map[uid] = obj;
      const key = this.map.order[this.map.order.length - 1];
      this.repeatDelay = this.map[key].repeatDelay;
      this.repeatInterval = this.map[key].repeatInterval;
      // console.log(this.repeatDelay, this.repeatInterval);
    },
    restoreConfig(uid) {
      if (this.map.order.includes(uid)) {
        this.map.order.splice(this.map.order.indexOf(uid), 1);
        delete this.map[uid];
      }
      const key = this.map.order[this.map.order.length - 1];
      this.repeatDelay = this.map[key].repeatDelay;
      this.repeatInterval = this.map[key].repeatInterval;
    },
    getKeyType(keyCode) {
      let keyName = false;
      Object.keys(KEY_CODES).forEach(name => {
        if (keyCode === KEY_CODES[name]) {
          keyName = name;
        }
      });
      return keyName;
    },
  },
});
