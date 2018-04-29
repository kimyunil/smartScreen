import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
import source from '@/store/source/';
import bixby from '@/store/bixby/';
import home from '@/store/home/';
import config from './config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gConfig: config,
    info: {
      weather: null,
    },
    viewStack: ['screensaver'],
    socketConnected: false,
    isRemoteEnabled: false,
    suggestions: ['Go to Home', 'Show me News', 'What is the Weather Today?'],
    isBixbyActive: false,
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
    CONNECTED(state) {
      state.socketConnected = true;
    },
    DISCONNECTED(state) {
      state.socketConnected = false;
    },
    SET_WEATHER(state, payload) {
      console.log(payload);
      state.info.weather = payload;
    },
    REMOVE_IF_EXSIST(state, name) {
      for (let i = 0; i < state.viewStack.length; i += 1) {
        if (state.viewStack[i] === name) {
          state.viewStack.splice(i, 1);
          break;
        }
      }
    },
  },
  actions: {
    LAUNCH_VOICE({ state, commit }) {
      commit('bixby/UPDATE_BIXBY', 'invoke');
      state.isBixbyActive = true;
    },
    CLOSE_VOICE({ state, commit }) {
      commit('bixby/UPDATE_BIXBY', 'initial');
      state.isBixbyActive = false;
    },
    SWITCH_COMPONENT({ state, commit }, payload) {
      commit('REMOVE_IF_EXSIST', payload.name);
      if (payload.replace) {
        Vue.set(state.viewStack, state.viewStack.length - 1, payload.name);
      } else {
        state.viewStack.push(payload.name);
      }
    },
    LAUNCH_COMPONENT({ state, dispatch, commit }, payload) {
      console.log(payload.category);
      switch (payload.category) {
        case 'hulu': {
          const appSource = state.source.source;
          appSource.currentSource = 'hulu';
          for (let i = 0; i < appSource.hbo.subComp.length; i += 1) {
            appSource.hbo.subComp.pop();
          }
          appSource.hbo.subComp.push(payload.subcategory);
          if (payload.url) commit('source/UPDATE_PLAYER', { url: payload.url });
          dispatch('SWITCH_COMPONENT', { replace: false, name: 'hulu' });
          break;
        }
        case 'hbo': {
          const appSource = state.source.source;
          appSource.currentSource = 'hbo';
          for (let i = 0; i < appSource.hbo.subComp.length; i += 1) {
            appSource.hbo.subComp.pop();
          }
          appSource.hbo.subComp.push(payload.subcategory);
          if (payload.url) commit('source/UPDATE_PLAYER', { url: payload.url });
          dispatch('SWITCH_COMPONENT', { replace: false, name: 'hbo' });
          break;
        }
        case 'spotify': {
          console.log(payload.artist);
          if (payload.artist) dispatch('source/SET_MUSIC_PLAYER', { artist: payload.artist });
          dispatch('SWITCH_COMPONENT', { replace: false, name: 'spotify' });
          break;
        }
        default:
          break;
      }
    },
    REMOVE_COMPONENT({ state }) {
      state.viewStack.pop();
    },
  },
  modules: {
    animation,
    source,
    bixby,
    home,
  },
});
export default store;
