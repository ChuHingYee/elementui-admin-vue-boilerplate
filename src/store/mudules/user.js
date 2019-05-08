import Vue from 'vue';
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types';
import { LoginSevice, logoutSevice } from '@/apis/app';
const user = {
  state: {
    userInfo: {},
    tipsTimer: null
  },
  mutations: {
    SET_USERINFO (state, userInfo) {
      console.log(userInfo);
      state.userInfo = userInfo;
    },
    SET_TIPSTIMER (state, timer) {
      state.tipsTimer = timer;
    }
  },
  actions: {
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        const { username, password, rememberMe } = params;
        LoginSevice({ username, password }).then(
          res => {
            const { name, roleID, expireTime, token, _id, ava } = res;
            const userInfo = { name, roleID, expireTime, token, _id, ava };
            if (rememberMe) {
              Vue.ls.set(ACCESS_TOKEN, token);
              Vue.ls.set(USER_INFO, userInfo);
            }
            commit('SET_USERINFO', userInfo);
            resolve();
          },
          err => {
            reject(err);
          }
        );
      });
    },
    Logout ({ commit, dispatch }) {
      Vue.ls.set(ACCESS_TOKEN, '');
      Vue.ls.set(USER_INFO, {});
      commit('SET_USERINFO', {});
      dispatch('permission/ResetRoleMenu');
      logoutSevice();
    }
  }
};

export default user;
