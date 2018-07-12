import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
import source from '@/store/source/';
import bixby from '@/store/bixby/';
import home from '@/store/home/';
import result from '@/store/result/';
import config from './config';
import Messages from '../services/Messages';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    gConfig: config,
    screenshot: '',
    vidAutoplay: false,
    sleep: false,
    setup: false,
    transition: 'slide',
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
    TOGGLE_VIDEO_AUTO(state) {
      state.vidAutoplay = !state.vidAutoplay;
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
    CLEARTIMEOUT({ state }) {
      clearTimeout(state.voiceTimerID);
    },
    RESET_VOICE_TIMER() {
      // state.isRemoteEnabled = true;
      clearTimeout(this.voiceTimerID);
      this.voiceTimerID = setTimeout(() => {
        // if (state.viewStack[state.viewStack.length - 1] !== 'screensaver') {
        //   state.sleep = true;
        //   dispatch('SWITCH_COMPONENT', { replace: true, name: 'screensaver', transition: 'slide' });
        // }
      }, 15000);
    },
    SCREEN_TIMEOUT({ state, dispatch }) {
      if (state.viewStack[state.viewStack.length - 1] !== 'screensaver') {
        state.sleep = true;
        dispatch('SWITCH_COMPONENT', { replace: true, name: 'screensaver', transition: 'slide' });
      }
    },
    COMPLETE_SETUP({ state }, payload) {
      state.setup = payload;
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
      dispatch('CLEARTIMEOUT');
      state.isRemoteEnabled = false;
      state.isBixbyActive = true;
    },
    CLOSE_VOICE({ state, commit, dispatch }) {
      commit('bixby/UPDATE_BIXBY', 'initial');
      state.isBixbyActive = false;
      dispatch('RESET_VOICE_TIMER');
      // state.isRemoteEnabled = true;
    },
    TOGGLE_MEDIA({ state }) {
      if (state.source.player.active) {
        const oldState = state.source.player.playerState;
        state.source.player.playerState = -1;
        setTimeout(() => {
          state.source.player.playerState = 1 - oldState;
        }, 20);
      } else if (state.source.musicplayer.active) {
        const oldState = state.source.musicplayer.playerState;
        state.source.musicplayer.playerState = -1;
        setTimeout(() => {
          state.source.musicplayer.playerState = 1 - oldState;
        }, 20);
      }
    },
    SWITCH_COMPONENT({ state, commit, getters }, payload) {
      const compoName = payload.name;
      const compDetail = state.gConfig.components[compoName];
      if (payload.transition) {
        state.transition = payload.transition;
      } else {
        state.transition = 'fade'; // default;
      }
      console.log(payload.transition);
      if (compDetail.vType === 'screenshot') {
        state.screenshot = compDetail;
        // compoName = 'screenshot';
      }
      commit('REMOVE_IF_EXSIST', compoName);
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
    UPDATE_MILLENIALS({ state }, payload) {
      if (payload.subcategory === 'showmore') {
        if (state.home.showMore === 'boot') {
          state.home.showMore = 'initial';
        } else if (state.home.showMore === 'initial') {
          state.home.showMore = 'partial';
          state.home.navId = 'lowerdeck';
        } else if (state.home.showMore === 'partial') {
          state.home.showMore = 'fullhome';
        }
      } else if (payload.subcategory === 'contentType') {
        state.home.showMore = 'fullhome';
        state.home.navId = 'lowerdeck';
        state.home.selectedIdx = payload.idx;
      } else if (payload.subcategory === 'browse') {
        if (state.home.showMore === 'initial') {
          state.home.panning = !state.home.panning;
        }
      } else if (payload.subcategory === 'partial') {
        state.home.showMore = 'partial';
        state.home.navId = 'lowerdeck';
        state.home.selectedIdx = payload.idx;
      }
    },
    CONFIG_UPDATE({ state, dispatch }, payload) {
      switch (payload.subcategory) {
        case 'wakeup':
          if (state.viewStack.length >= 1 && state.viewStack[state.viewStack.length - 1] === 'screensaver') {
            if (!state.sleep) {
              state.sleep = true;
            } else {
              dispatch('SWITCH_COMPONENT', { replace: true, name: 'home', transition: 'slide' });
            }
          }
          break;
        case 'screen-timeout':
          dispatch('SCREEN_TIMEOUT');
          break;
        case 'enableVideo':
        case 'disableVideo':
          state.vidAutoplay = payload.value;
          break;
        case 'disableRemote':
        case 'enableRemote':
          state.isRemoteEnabled = payload.value;
          break;
        default:
          break;
      }
    },
    LAUNCH_COMPONENT({ state, dispatch, commit }, payload) {
      switch (payload.category) {
        case 'millenials':
          if (state.viewStack[state.viewStack.length - 1] !== 'home') {
            dispatch('SWITCH_COMPONENT', { replace: true, name: 'home', transition: 'slide' });
          }
          dispatch('UPDATE_MILLENIALS', payload);
          break;
        case 'home': {
          commit('home/select_nav', payload.subcategory);
          state.home.showMore = 'boot';
          if (state.viewStack[state.viewStack.length - 1] !== 'home') {
            dispatch('SWITCH_COMPONENT', { replace: true, name: 'home' });
          }
          break;
        }
        case 'config': {
          dispatch('CONFIG_UPDATE', payload);
          console.log(payload.subcategory);
          break;
        }
        case 'hulu': {
          const appSource = state.source.source;
          appSource.currentSource = 'hulu';
          let cIdx = appSource.hulu.subComp.indexOf(payload.subcategory);
          if (cIdx === -1) cIdx = 0;
          appSource.hulu.idx = cIdx;
          if (payload.content) dispatch('source/LOAD_APP_PLAYER', payload);
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'hulu' });
          break;
        }
        case 'hbo': {
          const appSource = state.source.source;
          appSource.currentSource = 'hbo';
          let cIdx = appSource.hbo.subComp.indexOf(payload.subcategory);
          if (cIdx === -1) cIdx = 0;
          if (state.isBixbyActive && appSource.hbo.subComp[cIdx] === 'player') {
            // Messages.send('text-to-speech.say', 'playing Westword in HBO');
          }
          appSource.hbo.idx = cIdx;
          if (payload.content) dispatch('source/LOAD_APP_PLAYER', payload);
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'hbo' });
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
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'spotify' });
          if (payload.artist) dispatch('source/SET_MUSIC_PLAYER', payload);
          else if (payload.loop) dispatch('source/SKIP_NEXT');
          break;
        }
        case 'fitbit': {
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'fitbit' });
          break;
        }
        case 'spotifyhome': {
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'spotifyhome' });
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
        case 'hboplayer':
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'hboplayer', transition: 'blur' });
          break;
        case 'vevo':
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'vevo', transition: 'blur' });
          break;
        case 'ytplayer':
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'ytplayer', transition: 'blur' });
          break;
        case 'result-idx':
          commit('result/SKIP_RESULT', payload.subcategory);
          break;
        case 'topaction':
        case 'youtubetrend':
          commit('result/SET_RESULT', payload);
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'result', transition: 'blur' });
          break;
        case 'movies': {
          commit('result/SET_RESULT', payload);
          dispatch('SWITCH_COMPONENT', { replace: true, name: 'result', transition: 'blur' });
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
    result,
  },
});
export default store;
