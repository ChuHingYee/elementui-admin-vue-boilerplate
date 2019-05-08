import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { Message } from 'element-ui';
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 10000 // request timeout
  // withCredentials: true
});

const handleLogout = () => {
  store.dispatch('Logout').then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });
};

const err = error => {
  console.log(error, 'error');
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      Message.error(data.message);
    }
    if (error.response.status === 401) {
      Message.error('Authorization verification failed');
      if (token) {
        handleLogout();
      }
    }
  } else {
    const errorStr = error + '';
    if (errorStr.indexOf('timeout') !== -1) {
      Message.error('网络超时，请稍后重新尝试');
    }
  }
  return Promise.reject(error);
};

// 白名单接口地址
const whitelist = ['/user/login', '/user/logout'];

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  config.headers['custom'] = JSON.stringify({ version: '1.0.0' });
  if (store.getters.userInfo.token) {
    return config;
  } else {
    const currentUrl = config.url.replace(process.env.VUE_APP_BASE_URL, '');
    const index = whitelist.findIndex(url => {
      return url === currentUrl;
    });
    if (index !== -1) {
      return config;
    } else {
      return {};
    }
  }
}, err);

service.interceptors.response.use(response => response, err);

function fetch (data, flag = true) {
  return new Promise((resolve, reject) => {
    const config = { ...data, withCredentials: true };
    service(config).then(
      res => {
        const { data } = res;
        if (data.success) {
          resolve(data.data ? data.data : data);
        } else {
          if (data.code === 19002) {
            handleLogout();
            return;
          }
          flag &&
            Message.error(data.data.message ? data.data.message : '网络错误～');
          reject(data);
        }
      },
      error => {
        reject(error);
      }
    );
  });
}

export default fetch;
