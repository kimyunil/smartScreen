import data from './data';

export default {
  namespaced: true,
  state: {
    db: data,
    result: null,
  },
  mutations: {
    GET_MOVIES(state, payload) {
      const result = {};
      if (state.db.movies[payload.subcategory]) {
        result.data = state.db.movies[payload.subcategory];
        result.dataList = [];
        for (let i = 0; i < result.data.list.length; i += 1) {
          const key = result.data.list[i];
          result.dataList[i] = state.db.movies.data[key];
        }
      }
      state.result = result;
    },
    GET_MUSIC(state, payload) {
      const result = {};
      if (state.db.music[payload.subcategory]) {
        result.data = state.db.music[payload.subcategory];
        result.dataList = [];
        for (let i = 0; i < result.data.list.length; i += 1) {
          const key = result.data.list[i];
          result.dataList[i] = state.db.music.data[key];
        }
      }
      console.log(result);
      state.result = result;
    },
    GET_INFO(state, payload) {
      let result = {};
      if (state.db.info[payload.subcategory]) {
        result.data = state.db.info[payload.subcategory];
      }
      state.result = result;
      console.log(result);
    },
    RESET_RESULT(state) {
      state.result = null;
    },
  },
  actions: {
    SET_RESULT({ commit }, payload) {
      if (payload.category === 'movies') {
        commit('GET_MOVIES', payload);
      } else if(payload.category === 'music') {
        commit('GET_MUSIC', payload);
      } else if(payload.category === 'info') {
        commit('GET_INFO', payload);
      }
    },
  },
};
