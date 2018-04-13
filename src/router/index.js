import Vue from 'vue';
import Router from 'vue-router';
import smartscreen from '@/components/smartscreen';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SmartScreen',
      component: smartscreen,
    },
  ],
});
