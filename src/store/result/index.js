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
      if (index > state.resultData.slides.length) index %= state.resultData.slides.length;
      console.log(index);
      state.resultData.idx = index;
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
