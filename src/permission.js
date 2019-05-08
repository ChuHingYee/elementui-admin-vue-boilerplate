import Vue from 'vue';
import { router } from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Notification } from 'element-ui';
import { USER_INFO } from './store/mutation-types';
import { timeFix } from '@/utils/tools';

// NProgress Configuration
NProgress.configure({
  showSpinner: false
});

// no redirect whitelist
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const userInfo = store.getters.userInfo.roleID
    ? store.getters.userInfo
    : Vue.ls.get(USER_INFO);
  /* has token */
  if (userInfo && userInfo.roleID) {
    const nowTime = new Date().getTime();
    if (nowTime - userInfo.expireTime > 0) {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        Vue.$message({
          showClose: true,
          message: '登录超时，请稍后重新登录～',
          type: 'warning'
        });
        next('/login'); // 否则全部重定向到登录页
        NProgress.done();
      }
      return;
    }
    if (!store.getters.userId) {
      store.commit('SET_USERINFO', userInfo);
    }
    if (to.path === '/login') {
      next({ name: 'Home' });
      NProgress.done();
    } else {
      if (store.getters.roleRouters.length === 0) {
        try {
          await store.dispatch('permission/GetRoleMenu', {
            id: userInfo.roleID
          });
          await router.addRoutes(store.getters.roleRouters); // 动态添加可访问路由表
          setTimeout(() => {
            Notification({
              title: '欢迎',
              message: `${timeFix()}，欢迎回来`
            });
          }, 1000);
          next({
            ...to,
            replace: true
          });
        } catch (error) {
          store.commit('SET_ROUTERS', {
            routers: []
          });
          store.dispatch('Logout').then(() => {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done();
          });
        }
      } else {
        if (
          to.path === '/system/router' &&
          store.getters.userInfo.roleId !== 1
        ) {
          next('/403');
        } else {
          next();
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
