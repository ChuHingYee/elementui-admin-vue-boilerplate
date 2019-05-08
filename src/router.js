import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap } from '@/configs/globalRoutersSetting';

Vue.use(Router);

export const router = new Router({
  // 采取history模式，需要后端配置，如不需要可注销
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
