import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store/index';
import './plugins';
import './utils/filters';
import './directives';
import './permission';
import './styles/reset.scss';
import './styles/base.scss';

import './mock/index'; // mockjs

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
