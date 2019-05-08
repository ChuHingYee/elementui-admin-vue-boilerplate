const tabs = {
  state: {
    visitedRoutes: [],
    // cacheRouters: [],
    currentTabIndex: -1,
    isTabsMenuShow: false
  },
  mutations: {
    ADD_VISITED_ROUTE: (state, route) => {
      const currentIndex = state.visitedRoutes.findIndex(item => {
        return item.name === route.name;
      });
      if (currentIndex === -1) {
        state.visitedRoutes.push({
          name: route.name,
          routerName: route.meta.title || '403',
          path: route.path,
          query: route.query,
          noCache: !!route.meta.noCache
        });
        state.currentTabIndex = state.visitedRoutes.length - 1;
      } else {
        state.currentTabIndex = currentIndex;
      }
    },
    CLOSE_VISITED_ROUTE: (state, route) => {
      const currentIndex = state.visitedRoutes.findIndex((item, index) => {
        return item.name === route.name;
      });
      if (currentIndex !== -1) {
        state.currentTabIndex = currentIndex;
        state.visitedRoutes.splice(currentIndex, 1);
      }
    },
    CLOSE_NEXT_ROUTES: (state, routes) => {
      const targetIndex = state.visitedRoutes.findIndex((item, index) => {
        return item.name === routes.target.name;
      });
      const currentIndex = state.visitedRoutes.findIndex((item, index) => {
        return item.name === routes.current.name;
      });
      if (targetIndex !== -1) {
        if (targetIndex < currentIndex) {
          state.currentTabIndex = targetIndex;
        } else {
          state.currentTabIndex = -1;
        }
        state.visitedRoutes.splice(targetIndex + 1, state.visitedRoutes.length);
      }
    },
    CLEAN_NEXT_CACHE_ROUTE: (state, route) => {
      const cacheIndex = state.cacheRouters.findIndex(item => {
        return item === route.name;
      });
      if (cacheIndex !== -1) {
        state.cacheRouters.splice(cacheIndex, state.cacheRouters.length);
      }
    },
    CLOSE_OTHERS_ROUTES: (state, route) => {
      state.visitedRoutes = state.visitedRoutes.filter(item => {
        return item.name === route.name;
      });
    },
    CLEAN_OTHERS_CACHE_ROUTE: (state, route) => {
      state.cacheRouters = state.cacheRouters.filter(item => {
        return item === route.name;
      });
    },
    CLOSE_ALL_ROUTES: state => {
      state.visitedRoutes = [];
    },
    CLEAN_ALL_CACHE_ROUTE: state => {
      state.cacheRouters = [];
    },
    UPDATE_TAB_WIDTH: (state, route) => {
      state.visitedRoutes.find(item => {
        if (item.name === route.name) {
          item.width = route.width;
        }
        return item.name === route.name;
      });
    },
    SET_TABSMENU_TYPE (state, type) {
      state.isTabsMenuShow = type;
    }
  },
  actions: {
    /**
     *添加标签
     *
     * @param {*} { commit }
     * @param {Object} route 当前标签
     */
    AddVisitedRoute ({ commit }, route) {
      commit('ADD_VISITED_ROUTE', route);
    },
    /**
     *关闭标签
     *
     * @param {*} { commit }
     * @param {Object} route 当前标签
     */
    CloseVisitedRoutes ({ commit }, route) {
      commit('CLOSE_VISITED_ROUTE', route);
    },
    /**
     *关闭右侧标签
     *
     * @param {*} { commit }
     * @param {Object} routes {target: 目标标签, current: 当前标签}
     */
    CloseNextRoutes ({ commit }, routes) {
      commit('CLOSE_NEXT_ROUTES', routes);
      commit('CLEAN_NEXT_CACHE_ROUTE', routes.target);
    },
    /**
     *关闭其他标签
     *
     * @param {*} { commit }
     * @param {*} route 当前标签
     */
    CloseOthersRoutes ({ commit }, route) {
      commit('CLOSE_OTHERS_ROUTES', route);
      commit('CLEAN_OTHERS_CACHE_ROUTE', route);
    },
    /**
     *关闭所有标签
     *
     * @param {*} { commit }
     */
    CloseAllRoutes ({ commit }) {
      commit('CLOSE_ALL_ROUTES');
      commit('CLEAN_ALL_CACHE_ROUTE');
    },
    /**
     *更新标签宽度
     *
     * @param {*} { commit }
     * @param {*} route 当前标签
     */
    UpdateTabWidth ({ commit }, route) {
      commit('UPDATE_TAB_WIDTH', route);
    },
    /**
     *更新标签栏菜单显示状态
     *
     * @param {*} { commit }
     * @param {*} type 显示状态
     */
    SetTabsMenuType ({ commit }, type) {
      commit('SET_TABSMENU_TYPE', type);
    }
  }
};

export default tabs;
