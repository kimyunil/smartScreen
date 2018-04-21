import data from './data';

export default {
  namespaced: true,
  state: {
    data,
  },
  props: {
    active: {
      type: Boolean,
      require: true,
    },
  },
  getters: {
    GET_CAT_GRID: state => (index) => {
      console.log(index);
      const navItem = state.data.navs.items[index];
      const category = state.data.navs.details[navItem];
      const pages = [];
      const localData = category.data;
      for (let i = 0; i < localData.pages.pagination.length; i += 1) {
        const key = localData.pages.pagination[i];
        pages[i] = localData.pages.details[key];
      }
      return pages;
    },
    GET_SELECTED_NAV(state) {
      return state.data.navs.selectedIdx;
    },
    GET_FORYOU_APPS(state) {
      const foryou = state.data.navs.details.for_you.data;
      const apps = foryou.apps.items;
      const appsArr = [];
      for (let i = 0; i < apps.length; i += 1) {
        const key = apps[i];
        appsArr[i] = foryou.apps.details[key];
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
  mutations: {
    select_nav(state, indx) {
      state.data.navs.selectedIdx = indx;
    },
  },
};
