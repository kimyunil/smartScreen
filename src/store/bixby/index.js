import data from './data';

export default {
  namespaced: true,
  state: {
    db: data,
    result: null,
  },
  mutations: {
    GET_MOVIES(state, payload) {
      console.log(payload);
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
    RESET_RESULT(state) {
      state.result = null;
    },
  },
  actions: {
    SET_RESULT({ commit }, payload) {
      if (payload.category === 'movies') {
        commit('GET_MOVIES', payload);
      }
    },
  },
};
