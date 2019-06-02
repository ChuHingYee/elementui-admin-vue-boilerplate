const getters = {
  // app
  isSiderCollapsed: state => state.app.isSiderCollapsed,
  resizeFlag: state => state.app.resizeFlag,
  clientWidth: state => state.app.clientWidth,
  clientHeight: state => state.app.clientHeight,
  isAutocompleteShow: state => state.app.isAutocompleteShow,
  // tabs
  isTabsMenuShow: state => state.tabs.isTabsMenuShow,
  visitedRoutes: state => state.tabs.visitedRoutes,
  currentTabIndex: state => state.tabs.currentTabIndex,
  cacheRouters: state =>
    state.tabs.visitedRoutes
      .filter(route => {
        return !route.noCache;
      })
      .map(route => {
        return route.name;
      }),
  // user
  logExpireTime: state => state.user.userInfo.expireTime,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo._id,
  // permission
  roleRouters: state => state.permission.roleRouters,
  roleRoutersArr: state => state.permission.roleRoutersArr
};
export default getters;
