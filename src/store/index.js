import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
import source from '@/store/source/';
import bixby from '@/store/bixby/';
import home from '@/store/home/';
import config from './config';
import Messages from '../services/Messages';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gConfig: config,
    screenshot: '',
    sleep: true,
    setup: false,
    info: {
      weather: null,
      todays: null,
      portland: null,
    },
    voiceTimerID: null,
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
  getters: {
    visibleComp(state) {
      if (state.viewStack.length > 0) {
        return state.gConfig.components[state.viewStack[state.viewStack.length - 1]];
      }
      return {};
    },
  },
  mutations: {
    UPDATE_SYS_FLAG(state, payload) {
      const keys = Object.keys(payload);
      for (let i = 0; i < keys.length; i += 1) {
        state[keys[i]] = payload[keys[i]];
      }
    },
    UPDATE_REMOTE_MODE(state, payload) {
      state.isRemoteEnabled = payload;
    },
    CONNECTED(state) {
      state.socketConnected = true;
    },
    DISCONNECTED(state) {
      state.socketConnected = false;
    },
    TOGGLE_SUGGESTION(state, payload) {
      state.toggleSuggest = payload;
    },
    SET_PORT_WEATHER(state, payload) {
      state.info.portland = payload;
    },
    SET_TODAY_WEATHER(state, payload) {
      state.info.todays = payload;
    },
    SET_WEATHER(state, payload) {
      state.info.weather = payload;
      state.info.todays = payload.condition;
    },
    REMOVE_IF_EXSIST(state, name) {
      for (let i = 0; i < state.viewStack.length; i += 1) {
        if (state.viewStack[i] === name) {
          state.viewStack.splice(i, 1);
          break;
        }
      }
      // remove other type;
      const tConfig = state.gConfig.components;
      for (let i = state.viewStack.length - 1; i !== -1; i -= 1) {
        const stkComp = state.viewStack[i];
        if (tConfig[stkComp].type === tConfig[name].type) {
          state.viewStack.splice(i, 1);
        }
      }
    },
  },
  actions: {
    RESET_VOICE_TIMER({ state }) {
      state.isRemoteEnabled = true;
      clearTimeout(this.voiceTimerID);
      this.voiceTimerID = setTimeout(() => {
        // state.isRemoteEnabled = false;
      }, 15000);
    },
    COMPLETE_SETUP({ state }, payload) {
      state.setup = payload;
      console.log('payload::::::::::::', payload);
      if (payload) {
        setTimeout(() => {
          state.sleep = false;
        }, 4000);
      }
    },
    SAVE_CONTINUE({ state, commit }, cpName) {
      if (cpName === 'spotify') {
        state.source.musicplayer.details.save.key = 'spotify';
        commit('home/SAVE_CONT_DATA', state.source.musicplayer.details.save);
      } else if (cpName === 'hbo' || cpName === 'hulu') {
        state.source.player.details.save.key = 'app';
        state.source.player.details.save.elapsedTime = state.source.player.elapsedTime;
        state.source.player.details.save.total = state.source.player.total;
        commit('home/SAVE_CONT_DATA', state.source.player.details.save);
      }
    },
    LAUNCH_VOICE({ state, commit, dispatch }) {
      commit('bixby/UPDATE_BIXBY', 'invoke');
      dispatch('REMOVE_COMPONENT_TYPE', { type: 'system' });
      state.isRemoteEnabled = false;
      state.isBixbyActive = true;
    },
    CLOSE_VOICE({ state, commit }) {
      commit('bixby/UPDATE_BIXBY', 'initial');
      state.isBixbyActive = false;
      // state.isRemoteEnabled = true;
    },
    SWITCH_COMPONENT({ state, commit, getters }, payload) {
      let compoName = payload.name;
      const compDetail = state.gConfig.components[compoName];
      if (compDetail.type === 'screenshot') {
        state.screenshot = compDetail;
        compoName = 'screenshot';
      } else {
        commit('REMOVE_IF_EXSIST', compoName);
      }
      if (payload.replace) {
        let idx = state.viewStack.length - 1;
        if (idx < 0) idx = 0;
        if (getters.visibleComp.type === 'system' && compDetail.type !== 'system') {
          // dont remove system if it exist at top
          console.log(idx);
          state.viewStack.splice(idx, 0, compoName);
        } else {
          state.viewStack.splice(idx, 1, compoName);
        }
      } else {
        let idx = state.viewStack.length - 1;
        if (idx < 0) idx = 0;
        if (getters.visibleComp.type === 'system' && compDetail.type !== 'system') {
          // dont remove system if it exist at top
          state.viewStack.splice(idx, 0, compoName);
        } else {
          state.viewStack.push(compoName);
        }
      }
    },
    LAUNCH_COMPONENT({ state, dispatch, commit }, payload) {
      console.log(payload.category);
      switch (payload.category) {
        case 'home': {
          commit('home/select_nav', payload.subcategory);
          if (state.viewStack[state.viewStack.length - 1] !== 'home') {
            dispatch('SWITCH_COMPONENT', { replace: false, name: 'home' });
          }
          break;
        }
        case 'hulu': {
          const appSource = state.source.source;
          appSource.currentSource = 'hulu';
          let cIdx = appSource.hulu.subComp.indexOf(payload.subcategory);
          if (cIdx === -1) cIdx = 0;
          appSource.hulu.idx = cIdx;
          if (payload.content) dispatch('source/LOAD_APP_PLAYER', payload);
          dispatch('SWITCH_COMPONENT', { replace: false, name: 'hulu' });
          break;
        }
        case 'hbo': {
          const appSource = state.source.source;
          appSource.currentSource = 'hbo';
          let cIdx = appSource.hbo.subComp.indexOf(payload.subcategory);
          if (cIdx === -1) cIdx = 0;
          if (state.isBixbyActive && appSource.hbo.subComp[cIdx] === 'player') {
            Messages.send('text-to-speech.say', 'playing Westword in HBO');
          }
          appSource.hbo.idx = cIdx;
          if (payload.content) dispatch('source/LOAD_APP_PLAYER', payload);
          dispatch('SWITCH_COMPONENT', { replace: false, name: 'hbo' });
          break;
        }
        case 'which-song': {
          const music = state.source.musicplayer.details;
          if (music) {
            const syaText = `Playing ${music.song} by ${music.artist}`;
            Messages.send('text-to-speech.say', syaText);
          }
          break;
        }
        case 'spotify': {
          dispatch('SWITCH_COMPONENT', { name: 'spotify' });
          if (payload.artist) dispatch('source/SET_MUSIC_PLAYER', payload);
          else if (payload.loop) dispatch('source/SKIP_NEXT');
          break;
        }
        case 'fitbit': {
          dispatch('SWITCH_COMPONENT', { name: 'fitbit' });
          break;
        }
        case 'spotifyhome': {
          dispatch('SWITCH_COMPONENT', { name: 'spotifyhome' });
          break;
        }
        case 'volume': {
          console.log(payload.data);
          dispatch('source/UPDATE_VOLUME', payload.data);
          setTimeout(() => {
            dispatch('SWITCH_COMPONENT', { replace: false, name: 'volume' });
          });
          break;
        }
        case 'back': {
          if (state.isBixbyActive) {
            Messages.$emit('button_down', 'BACK');
            setTimeout(() => {
              console.log('Goback');
              Messages.$emit('button_down', 'BACK');
            }, 600);
          } else {
            Messages.$emit('button_down', 'BACK');
          }
          break;
        }
        case 'media':
          // not launching anything for now, may be in future
          if (state.source.player.active) {
            state.source.player.playerState = -1;
            setTimeout(() => {
              state.source.player.playerState = payload.data;
            }, 20);
          } else if (state.source.musicplayer.active) {
            state.source.musicplayer.playerState = -1;
            setTimeout(() => {
              state.source.musicplayer.playerState = payload.data;
            }, 20);
          }
          break;
        case 'ss-timeout': {
          state.home.timeout = payload.data;
          console.log(payload.data);
          break;
        }
        default:
          break;
      }
    },
    REMOVE_COMPONENT_TYPE({ state }, payload) {
      const name = payload.type;
      const tConfig = state.gConfig.components;
      for (let i = state.viewStack.length - 1; i !== -1; i -= 1) {
        const stkComp = state.viewStack[i];
        if (tConfig[stkComp].type === name) {
          state.viewStack.splice(i, 1);
        }
      }
    },
    REMOVE_COMPONENT({ state, dispatch }, payload = null) {
      if (payload) {
        const idx = state.viewStack.indexOf(payload);
        if (idx !== -1) state.viewStack.splice(idx, 1);
      } else {
        state.viewStack.pop();
      }
      if (state.viewStack.length === 0) {
        dispatch('SWITCH_COMPONENT', { replace: false, name: 'home' });
      }
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
