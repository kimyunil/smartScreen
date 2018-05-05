import data from './data';

export default {
  namespaced: true,
  state: {
    data,
    resultData: {
      title: '',
      idx: -1,
      slides: [],
      data: null,
    },
  },
  mutations: {
    UPDATE_SLIDE_IDX(state, index) {
      let t = index;
      if (index > state.resultData.slides.length) t %= state.resultData.slides.length;
      state.resultData.idx = t;
    },
    SET_RESULT(state, payload) {
      const movieDB = state.data.movies[payload.subcategory];
      if (movieDB) {
        state.resultData.slides = [];
        for (let i = 0; i < movieDB.list.length; i += 1) {
          state.resultData.slides[i] = movieDB.list[i];
        }
        state.resultData.data = movieDB.details;
        state.resultData.title = movieDB.title;
        state.resultData.idx = 0;
      }
    },
  },
};
