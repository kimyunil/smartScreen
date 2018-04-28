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
      commit('UPDATE_BIXBY', 'invoke');
      state.isBixbyActive = true;
    },
    CLOSE_VOICE({ state, commit }) {
      commit('UPDATE_BIXBY', '');
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
      switch(payload.category) {
        case 'hbo':
          state.source.source.currentSource = 'hbo';
          while(state.source.source.hbo.subComp.length !== 0) {
            state.source.source.hbo.subComp.pop();
          }
          state.source.source.hbo.subComp.push(payload.subcategory);
          dispatch('SWITCH_COMPONENT', { replace: false, name:'hbo' });
          break;
        case 'hulu':
          state.source.source.currentSource = 'hulu';
          while(state.source.source.hbo.subComp.length !== 0) {
            state.source.source.hbo.subComp.pop();
          }
          state.source.source.hbo.subComp.push(payload.subcategory);
          dispatch('SWITCH_COMPONENT', { replace: false, name:'hulu' });
          break;
          case 'volume':
            if (payload.data === 'decrease') {
              dispatch('SWITCH_COMPONENT', { replace: false, name:'volume' });
              commit('source/UPDATE_VOLUME', '--');            
            } else if (payload.data === 'increase'){
              commit('source/UPDATE_VOLUME', '++');
              dispatch('SWITCH_COMPONENT', { replace: false, name:'volume' });  
            } else if (payload.data === 'mute'){
              commit('source/TOGGLE_MUTE');
              dispatch('SWITCH_COMPONENT', { replace: false, name:'volume' });
            }
            break;
          case 'back': 
            break;
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
