import data from './data';

export default {
  namespaced: true,
  state: {
    data,
    suggestions: ['Tell me more About Self Esteem', 'Go to Health and Wellness', 'Show me more...']
  },
  props: {
    active: {
      type: Boolean,
      require: true,
    },
  },
  getters: {
    GET_CAT_GRID: state => (index) => {
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
    GET_SUGGESTIONS(state) {
      const navItem = state.data.navs.items[state.data.navs.selectedIdx];
      const category = state.data.navs.details[navItem].data;
      console.log(category);
      return category.suggestions;
    },
    PAGE_SUB_CAT_HEALTH: state => (index) => {
      const healthPages = state.data.navs.details.health.data.pages;
      const pageKey = healthPages.pagination[index];
      const page = healthPages.details[pageKey];
      const arr = [];
      for (let i = 0; i < page.sublist.length; i += 1) {
        const sKey = page.sublist[i];
        const obj = {};
        obj.title = page[sKey].title;
        obj.items = [];
        for (let j = 0; j < page[sKey].items.length; j += 1) {
          const ssKey = page[sKey].items[j];
          obj.items[j] = healthPages.subCategories[ssKey];
        }
        arr[i] = obj;
      }
      return arr;
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
    GET_HEALTH_APPS(state) {
      const health = state.data.navs.details.health.data;
      const apps = health.apps.items;
      const appsArr = [];
      for (let i = 0; i < apps.length; i += 1) {
        const key = apps[i];
        appsArr[i] = health.apps.details[key];
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
