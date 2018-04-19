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
      if (payload.starrer === 'tom_hanks') {
        console.log('tom HAnks', state.db.movies.data.tom_hanks);
        state.result = state.db.movies.data.tom_hanks;
      }
    },
  },
  actions: {
    SET_RESULT({ state, commit }, payload) {
      if (payload.category === 'movies') {
        commit('GET_MOVIES', payload);
      }
      if (state.result !== null) {
        return true;
      }
      return false;
    },
  },
};
