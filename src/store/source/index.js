import musicDB from './music';
import moviesDB from './movies';

export default {
  namespaced: true,
  state: {
    musicDB,
    moviesDB,
    vTimeOut: null,
    selectedSourceURL: '/resources/ambient/Mountain/forest_long.mp4',
    metataData: {
      title: 'breaking bad',
      rating: 'sample',
    },
    source: {
      currentSource: 'hbo',
      hbo: {
        splashActive: true,
        default: '/resources/videos/hbo/GOT.mp4',
        subComp: ['home'], // home, player
        splash: {
          splashBG: '/static/Images/source/hbo.png',
        },
        home: {
          screenshot: '/static/Images/source/hbo-home.png',
        },
      },
      hulu: {
        splashActive: true,
        default: '/resources/videos/HBO_Family/maze_runner_scorch.mp4',
        subComp: ['player'], // home, player
        splash: {
          splashBG: '/static/Images/source/hulu.png',
        },
      },
    },
    player: {
      volume: 5,
      isDimVol: false,
      active: false,
      bckVol: 5,
      details: null,
      muted: false,
      maxVol: 16,
      playerState: 0, // 0-play 1-pause
      url: '',
    },
    musicplayer: {
      active: false,
      details: null,
      elapsedTime: 0,
      total: 0,
      playerState: 0, // 0-play 1-pause
      url: '',
    },
  },
  mutations: {
    SET_VOlUME_DIM(state, payload) {
      state.player.isDimVol = payload;
      if (payload) {
        state.player.bckVol = state.player.volume;
        state.player.volume = 2;
      } else {
        state.player.volume = state.player.bckVol;
      }
    },
    UPDATE_PLAYER(state, payload) {
      const arr = Object.keys(payload);
      for (let i = 0; i < arr.length; i += 1) {
        const key = arr[i];
        state.player[key] = payload[key];
      }
    },
    SET_MUSIC_ELAPSED(state, payload) {
      state.musicplayer.elapsedTime = payload;
      if (state.musicplayer.details && state.musicplayer.details.save) {
        state.musicplayer.details.save.elapsedTime = payload;
      }
    },
    MUSIC_STATE_UPDATE(state, payload) {
      state.musicplayer.playerState = payload;
    },
    SET_MUSIC_DURATION(state, payload) {
      state.musicplayer.total = payload;
      if (state.musicplayer.details && state.musicplayer.details.save) {
        state.musicplayer.details.save.total = payload;
      }
    },
    UPDATE_SOURCE_URL(state, payload) {
      state.selectedSourceURL = payload.url;
      state.metataData = payload;
    },
    RETURN_HBO_COMP(state) {
      state.source.hbo.subComp.pop();
    },
    UPDATE_HBO_COMP(state, payload) {
      const idx = state.source.hbo.subComp.indexOf(payload);
      if (idx !== -1) {
        state.source.hbo.subComp.splice(idx, 1);
      }
      state.source.hbo.subComp.push(payload);
    },
    RETURN_HULU_COMP(state) {
      state.source.hulu.subComp.pop();
    },
    UPDATE_HULU_COMP(state, payload) {
      const idx = state.source.hulu.subComp.indexOf(payload);
      if (idx !== -1) {
        state.source.hulu.subComp.splice(idx, 1);
      }
      state.source.hulu.subComp.push(payload);
    },
  },
  actions: {
    LOAD_APP_PLAYER({ state, commit }, payload) {
      state.player.details = state.moviesDB[payload.content].default;
      if (state.musicplayer.active) {
        state.musicplayer.active = false;
      }
      state.player.active = true;
      commit('UPDATE_PLAYER', { url: state.player.details.url });
    },
    SET_MUSIC_PLAYER({ state }, payload) {
      if (state.player.active) {
        state.player.active = false;
      }
      state.musicplayer.active = true;
      switch (payload.artist) {
        case 'ariana':
          state.musicplayer.details = state.musicDB.ariana.default;
          state.musicplayer.playerState = 0;
          break;
        case 'coldplay':
          state.musicplayer.details = state.musicDB.coldplay.default;
          state.musicplayer.playerState = 0;
          break;
        case 'classical':
          state.musicplayer.details = state.musicDB.classical.default;
          state.musicplayer.playerState = 0;
          break;
        case 'mj':
          state.musicplayer.details = state.musicDB.michael.default;
          state.musicplayer.playerState = 0;
          break;
        case 'pharelle':
          state.musicplayer.details = state.musicDB.pharrell.default;
          state.musicplayer.playerState = 0;
          break;
        default:
          break;
      }
    },
    UPDATE_VOLUME({ state, dispatch }, payload) {
      if (state.player.isDimVol) return;
      if (payload === '++') {
        if (state.player.volume < state.player.maxVol) {
          state.player.volume += 1;
        }
      } else if (payload === '--') {
        if (state.player.volume > 0) {
          state.player.volume -= 1;
        }
      } else if (payload === 'mute') {
        state.player.muted = !state.player.muted;
      }
      clearTimeout(state.vTimeOut);
      state.vTimeOut = setTimeout(() => {
        dispatch('REMOVE_COMPONENT', 'volume', { root: true });
      }, 5000);
    },
    TOGGLE_MUTE({ state, dispatch }) {
      state.player.muted = !state.player.muted;
      clearTimeout(state.vTimeOut);
      state.vTimeOut = setTimeout(() => {
        dispatch('REMOVE_COMPONENT', 'volume', { root: true });
      }, 5000);
    },
  },
};
