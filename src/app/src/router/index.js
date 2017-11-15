import Vue from 'vue';
import Router from 'vue-router';
import User from '@/components/User';
import Locations from '@/components/Locations';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User,
    },
    {
      path: '/user',
      name: 'UserLocations',
      component: Locations,
    },
  ],
});
