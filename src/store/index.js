import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
import source from '@/store/source/';
import result from '@/store/result/';
import home from '@/store/home/';
import config from './config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gConfig: config,
    viewStack: ['home'],
    socketConnected: false,
    isRemoteEnabled: false,
    bixbyState: '', // ['invoke', 'listen', 'think', 'wipeoff', 'reveal', 'standby1', 'standby2]
    socket: {
      connected: false,
      ip: '127.0.0.1',
      port: '2222',
    },
  },
  mutations: {
    UPDATE_REMOTE_MODE(state, payload) {
      state.isRemoteEnabled = payload;
    },
    UPDATE_BIXBY(state, payload) {
      state.bixbyState = payload;
    },
    CONNECTED(state) {
      state.socketConnected = true;
    },
    DISCONNECTED(state) {
      state.socketConnected = false;
    },
  },
  modules: {
    animation,
    source,
    result,
    home,
  },
});
export default store;
