import data from './data.js';
export default {
  namespaced: true,
  state: {
    data,
  },
  mutations: {
  },
  getters: {
    GET_DATA: (state) => (payload) => {
      return state.data[payload];
    },
  },
  actions: {

  },
};
