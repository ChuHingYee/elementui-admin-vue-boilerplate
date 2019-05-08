import Mock from 'mockjs';
import tableAPI from './table';
import routerAPI from './router';
import userAPI from './user';
import articleAPI from './article';
import treeAPI from './tree';
import chartAPI from './chart';
import uploadAPI from './upload';

// withCredentials = true
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
};

Mock.setup({
  timeout: '350-2000'
});
// table
Mock.mock(/(.*?)\/table\/list/, 'post', tableAPI.getList);
Mock.mock(/(.*?)\/table\/edit/, 'post', tableAPI.edit);
Mock.mock(/(.*?)\/table\/del/, 'post', tableAPI.del);
Mock.mock(/(.*?)\/table\/select/, 'post', tableAPI.select);

// router
Mock.mock(/(.*?)\/router\/list/, 'post', routerAPI.getTree);

// user
Mock.mock(/(.*?)\/user\/login/, 'post', userAPI.login);
Mock.mock(/(.*?)\/user\/logout/, 'post', userAPI.logout);
Mock.mock(/(.*?)\/user\/routes/, 'post', userAPI.routes);

// article
Mock.mock(/(.*?)\/article\/detail/, 'post', articleAPI.detail);

// tree
Mock.mock(/(.*?)\/tree\/list/, 'post', treeAPI.tree);

// chart
Mock.mock(/(.*?)\/chart\/detail/, 'post', chartAPI.detail);
Mock.mock(/(.*?)\/chart\/pie/, 'post', chartAPI.pie);
Mock.mock(/(.*?)\/chart\/homeHeader/, 'post', chartAPI.homeHeader);

// upload
Mock.mock(/(.*?)\/system\/upload/, 'post', uploadAPI.upload);

export default Mock;
