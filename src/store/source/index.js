
export default {
  namespaced: true,
  state: {
    selectedSourceURL: '/static/videos/tom_hanks_v01b_no_line.mp4',
    metataData: {
      title: 'breaking bad',
      rating: 'sample',
    },
  },
  mutations: {
    UPDATE_SOURCE_URL(state, payload) {
      state.selectedSourceURL = payload.url;
      state.metataData = payload;
    },
  },
};
