import {
  constantRouterMap,
  asyncRouterMap,
  exceptionRoutersMap
} from '@/configs/globalRoutersSetting';

import { GetRoutes } from '@/apis/app';

/**
 * 筛选角色路由
 * @param {角色路由} asyncRouters
 * @param {所有路由} routers
 * @param {所有路由列表} routersArr
 *
 */
function filterRouters (asyncRouters, routers, routersArr) {
  return routers.filter(router => {
    return asyncRouters.some((arouter, index) => {
      if (arouter.hasSet) {
        return false;
      }
      if (arouter.children) {
        if (router.children && arouter.uniName === router.name) {
          const routerChildren = filterRouters(
            arouter.children,
            router.children,
            routersArr
          );
          router.children = routerChildren;
          asyncRouters.splice(index, 1);
        } else if (arouter.children[0].type === 1) {
          router.meta.auth = arouter.children;
        }
      }
      if (arouter.uniName === router.name) {
        arouter.hasSet = true; // 标记以匹配路由
        if (router.meta.isRoute) {
          routersArr.push({
            value: router.meta.title,
            routeName: router.name
          });
        }
        return true;
      }
    });
  });
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    roleRouters: [],
    roleRoutersArr: []
  },
  mutations: {
    SET_ROUTERS: (state, preload) => {
      state.roleRouters = preload.routers;
      state.roleRoutersArr = preload.routersArr;
      state.routers = constantRouterMap.concat(preload.routers);
    },
    SET_CECHEROUTER: (state, preload) => {
      let _arr = [];
      preload.routers.filter(item => {
        if (item.children && item.children.length > 0) {
          item.children.forEach(fitem => {
            if (fitem.meta.noCache) {
              _arr.push(fitem.name);
            }
          });
        } else {
          if (item.meta.noCache) {
            _arr.push(item.name);
          }
        }
      });
      state.cacheRouters = _arr;
    },
    DEL_CECHEROUTER: (state, preload) => {
      let _arr = [];
      if (preload.type === 0) {
        _arr = state.cacheRouters.filter(item => {
          return item !== preload.name;
        });
      } else if (preload.type === 1) {
        _arr = state.cacheRouters.filter(item => {
          return item === preload.name;
        });
      }
      state.cacheRouters = _arr;
    },
    CHECK_CECHEROUTER: (state, preload) => {
      if (state.cacheRouters.indexOf(preload.name) === -1) {
        state.cacheRouters.push(preload.name);
      }
    }
  },
  actions: {
    GetRoleMenu ({ commit }, data) {
      return new Promise((resolve, reject) => {
        GetRoutes(data).then(
          res => {
            const roleRoutersArr = [];
            console.time();
            let endRouters = filterRouters(
              res.routes,
              asyncRouterMap,
              roleRoutersArr
            );
            console.timeEnd();
            endRouters = endRouters.concat(exceptionRoutersMap);
            if (endRouters.length > 0) {
              commit('SET_ROUTERS', {
                routers: endRouters,
                routersArr: roleRoutersArr
              });
              resolve();
            } else {
              reject(res);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    },
    ResetRoleMenu ({ commit }) {
      commit('SET_ROUTERS', {
        routers: []
      });
    }
  }
};

export default permission;
