
export default {
  namespaced: true,
  state: {
    selectedSourceURL: '/resources/ambient/Mountain/forest_long.mp4',
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
