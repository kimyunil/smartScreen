
export default {
  namespaced: true,
  state: {
    selectedSourceURL: '/resources/ambient/Mountain/forest_long.mp4',
    metataData: {
      title: 'breaking bad',
      rating: 'sample',
    },
    source: {
      currentSource: 'hbo',
      hbo: {
        splashActive: true,
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
        subComp: ['player'], // home, player
        splash: {
          splashBG: '/static/Images/source/hulu.png',
        },
      },
    },
    player: {
      volume: 5,
      muted: false,
      maxVol: 16,
      playerState: 0, // 0-play 1-pause
      url: '/resources/videos/HBO_Family/maze_runner_scorch.mp4',
    },
    musicplayer: {
      artist: 'Ariana Grande',
      song: 'No Tears Left to Cry',
      art: '/static/Images/spotify/songs/art/art2.png',
      elapsedTime: 0,
      total: 0,
      thumbnail: '/static/Images/spotify/songs/thumbnail/phareell.png',
      playerState: 0, // 0-play 1-pause
      url: '/resources/audio/MyMusic/major-lazer.mp3',
    },
  },
  mutations: {
    UPDATE_PLAYER(state, payload) {
      const arr = Object.keys(payload);
      for (let i = 0; i < arr.length; i += 1) {
        const key = arr[i];
        state.player[key] = payload[key];
      }
    },
    UPDATE_VOLUME(state, payload) {
      if (payload === '++') {
        if (state.player.volume < state.player.maxVol) {
          state.player.volume += 1;
        }
      } else if (payload === '--') {
        if (state.player.volume > 0) {
          state.player.volume -= 1;
        }
      }
    },
    SET_MUSIC_ELAPSED(state, payload) {
      state.musicplayer.elapsedTime = payload;
    },
    MUSIC_STATE_UPDATE(state, payload) {
      state.musicplayer.playerState = payload;
    },
    SET_MUSIC_DURATION(state, payload) {
      state.musicplayer.total = payload;
    },
    TOGGLE_MUTE(state) {
      state.player.muted = !state.player.muted;
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
};
