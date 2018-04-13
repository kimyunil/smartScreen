import data from './data.js';
export default {
  namespaced: true,
  state: {
    results: data,
  },
  mutations: {
    GET_MOVIES(state, payload) {
      return state.result.movies.data.tom_hanks;
    }
  },
};