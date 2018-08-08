import data from './data';

export default {
  namespaced: true,
  state: {
    data,
    selectedIdx: 0,
    speed: 30, // 30 pix/s
    slideIdx: 0,
    partialScroll: false, // for scrolling first list in category
    gridIdx: 0,
    panning: false,
    autoScroll: false,
    listType: 'autoscroll', // autoscroll , navigable
    navId: 'leftposter', // leftposter, rightgrid, lowerdeck
    showMore: 'boot', // initial partial, fullhome
    timeout: 30000,
  },
  props: {
    active: {
      type: Boolean,
      require: true,
    },
  },
  getters: {
    SPONSOR_DATA(state) {
      const list = [];
      const details = state.data.sponsors;
      const item = details.items;
      for (let i = 0; i < item.length; i += 1) {
        list[i] = details[item[i]];
      }
      return list;
    },
    HOME_FOCUS(state) {
      return state.data.navs.focus;
    },
    GET_HOME_GRIDS(state) {
      const dataJson = state.data.homescreen;
      const grid = dataJson.grids;
      const gridList = [];
      for (let i = 0; i < grid.length; i += 1) {
        const key = grid[i];
        const gridItem = dataJson[key];
        gridList[i] = dataJson[key];
        gridList[i].listItems = [];
        for (let j = 0; j < gridItem.content.length; j += 1) {
          const subkey = gridItem.content[j];
          gridList[i].listItems[j] = gridItem[subkey];
        }
      }
      return gridList;
    },
    GET_FORYOU_LIST(state) {
      const index = state.selectedIdx;
      const mkey = state.data.navs.items[index];
      const gridData = state.data.navs.details[mkey].data;
      const grid = gridData.gridlist;
      const gridList = [];
      for (let i = 0; i < grid.length; i += 1) {
        const key = grid[i];
        const gridItem = gridData[key];
        gridList[i] = gridData[key];
        gridList[i].listItems = [];
        gridList[i].index = gridItem.selIdx;
        gridList[i].key = key;
        for (let j = 0; j < gridItem.items.length; j += 1) {
          const subkey = gridItem.items[j];
          gridList[i].listItems[j] = gridItem[subkey];
        }
      }
      return gridList;
    },
    GET_SUGGESTIONS() {
      // const navItem = state.data.navs.items[state.data.navs.selectedIdx];
      // const category = state.data.navs.details[navItem].data.pages;
      // const pageKey = category.pagination[category.focusIdx];
      // console.log(category.details[pageKey].suggestions);
      // return category.details[pageKey].suggestions;
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
    GET_HEALTH_APPS() {
      // const health = state.data.navs.details.health.data;
      // const apps = health.apps.items;
      // const appsArr = [];
      // for (let i = 0; i < apps.length; i += 1) {
      //   const key = apps[i];
      //   appsArr[i] = health.apps.details[key];
      // }
      // return appsArr;
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
    IS_SCROLLING(state, val) {
      state.autoScroll = val;
    },
    SET_LIST_TYPE(state, value) {
      state.listType = value;
    },
    SET_HOME_DATA(state, index) {
      state.data.navs.focus = 1;
      state.selectedIdx = index;
      const mkey = state.data.navs.items[index];
      const gridData = state.data.navs.details[mkey].data;
      const cKey = gridData.gridlist[0];
      gridData[cKey].selIdx = 0;
    },
    RESET_CAT_IDX(state) {
      const index = state.selectedIdx;
      const mkey = state.data.navs.items[index];
      const gridData = state.data.navs.details[mkey].data;
      const grid = gridData.gridlist;
      for (let i = 0; i < grid.length; i += 1) {
        const key = grid[i];
        const gridItem = gridData[key];
        gridItem.selIdx = 0;
      }
    },
    UPDATE_CAT_IDX(state, obj) {
      const index = state.selectedIdx;
      const mkey = state.data.navs.items[index];
      const gridData = state.data.navs.details[mkey].data;
      gridData[obj.id].selIdx = obj.index;
    },
    UPDATE_SPONSOR_IDX(state, idx) {
      state.data.sponsors.idx = idx;
    },
    TOGGLE_MORE_DATA(state, showMore) {
      state.showMore = showMore;
    },
    SET_SLIDE_IDX(state, val) {
      state.slideIdx = val;
    },
    SET_GRID_IDX(state, val) {
      state.gridIdx = val;
    },
    SET_HOME_FOCUS(state, idx) {
      state.data.navs.focus = idx;
      if (idx === 1) {
        // make full screen state
        // state.showMore = 'fullhome';
      }
    },
    SET_FOCUS(state, id) {
      state.navId = id;
    },
    SET_NAV(state, indx) {
      state.selectedIdx = indx;
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
