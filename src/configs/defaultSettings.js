/**
 * 项目默认配置项
 *
 * vueLsOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  vueLsOptions: {
    namespace: 'admin__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
};
