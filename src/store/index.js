import Vue from 'vue';
import Vuex from 'vuex';
import animation from '@/store/animations/';
console.log(animation);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    animation,
  },
});
export default store;
