import data from './data';

export default {
  namespaced: true,
  state: {
    data,
  },
  mutations: {
  },
  getters: {
    GET_PAGES(state) {
      const pages = [];
      for (let i = 0; i < state.data.pages.pagination.length; i += 1) {
        const key = state.data.pages.pagination[i];
        pages[i] = state.data.pages.details[key];
      }
      return pages;
    },
    GET_SELECTED_NAV(state) {
      return state.data.navs.selectedIdx;
    },
    GET_APPS(state) {
      const apps = state.data.apps.items;
      const appsArr = [];
      for (let i = 0; i < apps.length; i += 1) {
        const key = apps[i];
        appsArr[i] = state.data.apps.details[key];
      }
      return appsArr;
    },
    GET_NAVS(state) {
      const navs = state.data.navs.items;
      const navesArr = [];
      for (let i = 0; i < navs.length; i += 1) {
        const key = navs[i];
        navesArr[i] = state.data.navs.details[key];
      }
      return navesArr;
    },
  },
  actions: {
  },
};
