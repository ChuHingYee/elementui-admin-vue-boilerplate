import Vue from 'vue';
import { SIDEBAR_TYPE } from '@/store/mutation-types';
const app = {
  state: {
    isSiderCollapsed: false,
    isAutocompleteShow: false,
    resizeFlag: 0,
    clientWidth: 0,
    clientHeight: 0
  },
  mutations: {
    SET_SIDER_TYPE (state, type) {
      state.isSiderCollapsed = type;
      Vue.ls.set(SIDEBAR_TYPE, type);
    },
    SET_ISAUTOCOMPLETESHOW (state, type) {
      state.isAutocompleteShow = type;
    },
    TRIGGER_RESIZE: state => {
      state.resizeFlag = state.resizeFlag + 1;
    },
    SET_CLIENTATTR: (state, clientInfo) => {
      state.clientWidth = clientInfo.width;
      state.clientHeight = clientInfo.height;
    }
  },
  actions: {
    SetSiderType ({ commit }, type) {
      commit('SET_SIDER_TYPE', type);
    },
    GetClientAttr ({ commit }) {
      const w =
        document.documentElement.clientWidth || document.body.clientWidth;
      const h =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (w < 1200) {
        commit('SET_SIDER_TYPE', true);
      } else {
        commit('SET_SIDER_TYPE', false);
      }
      commit('SET_CLIENTATTR', {
        width: w,
        height: h
      });
      commit('TRIGGER_RESIZE');
    },
    SetIsAutocompleteShow ({ commit }, type) {
      commit('SET_ISAUTOCOMPLETESHOW', type);
    },
    TriggerResize ({ commit }) {
      commit('TRIGGER_RESIZE');
    }
  }
};

export default app;
