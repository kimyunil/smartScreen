import data from './data.js';
export default {
  namespaced: true,
  state: {
    data,
  },
  mutations: {
  },
  getters: {
    GET_PAGES(state) {
      let pages = [];
      for (let i = 0; i < state.data.pages.pagination.length; i++) {
        const key = state.data.pages.pagination[i];
        pages[i] = state.data.pages.details[key];
      }
      console.log(pages);
      return pages;
    },
  },
  actions: {
  },
};
