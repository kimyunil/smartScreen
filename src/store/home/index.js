import data from './data';

export default {
  namespaced: true,
  state: {
    data,
    timeout: 30000,
  },
  props: {
    active: {
      type: Boolean,
      require: true,
    },
  },
  getters: {
    GET_FORYOU_LIST(state) {
      const foryou = state.data.navs.details.for_you.data;
      const grid = foryou.gridlist;
      const gridList = [];
      for (let i = 0; i < grid.length; i += 1) {
        const key = grid[i];
        const gridItem = foryou[key];
        gridList[i] = foryou[key];
        gridList[i].listItems = [];
        for (let j = 0; j < gridItem.items.length; j += 1) {
          const subkey = gridItem.items[j];
          gridList[i].listItems[j] = gridItem[subkey];
        }
      }
      return gridList;
    },
    GET_SUGGESTIONS(state) {
      const navItem = state.data.navs.items[state.data.navs.selectedIdx];
      const category = state.data.navs.details[navItem].data.pages;
      const pageKey = category.pagination[category.focusIdx];
      console.log(category.details[pageKey].suggestions);
      return category.details[pageKey].suggestions;
    },
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
    UPDATE_PAGE_IDX(state, idx) {
      const navItem = state.data.navs.items[state.data.navs.selectedIdx];
      const category = state.data.navs.details[navItem].data.pages;
      category.focusIdx = idx;
      console.log(idx);
    },
    SAVE_CONT_DATA(state, arg) {
      const payload = arg;
      // fetch category ie. for you
      console.log(payload);
      const navItem = state.data.navs.items[payload.index];
      const category = state.data.navs.details[navItem].data;
      console.log(category);
      // fetch page
      const pageKey = category.pages.pagination[payload.pageIdx];
      const pageDetail = category.pages.details[pageKey];
      console.log(pageDetail);
      // add basic data from replaced app;
      const appSave = pageDetail[payload.rmvApp];
      payload.type = appSave.type;
      payload.template = appSave.template;
      payload.contentType = appSave.contentType;
      pageDetail[payload.key] = payload;
      // update content list
      const idx = pageDetail.content.indexOf(payload.rmvApp);
      if (idx === -1) {
        // update the already added app details
        if (pageDetail.content.indexOf(payload.key) === -1) {
          pageDetail.content.push(payload.key);
        }
      } else {
        pageDetail.content.splice(idx, 1, payload.key);
      }
    },
  },
};
