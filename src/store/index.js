import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
import source from '@/store/source/';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    socketConnected: false,
    bixbyState: '', // ['invoke', 'listen', 'think', 'wipeoff', 'reveal', 'standby1', 'standby2]
    socket: {
      connected: false,
      ip: '127.0.0.1',
      socketPort: '2222',
    },
  },
  mutations: {
    UPDATE_BIXBY(state, payload) {
      state.bixbyState = payload;
    },
    SOCKET_CONNECTED(state) {
      state.socketConnected = true;
    },
    SOCKET_DISCONNECTED(state) {
      state.socketConnected = false;
    },
  },
  modules: {
    animation,
    source,
  },
});
export default store;
