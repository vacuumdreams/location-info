// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import io from 'socket.io-client';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8000';
Vue.http.headers['Content-Type'] = 'application/json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  io: {
    client: io,
    baseUrl: 'http://localhost:8001',
  },
  template: '<App />',
  components: { App },
});
