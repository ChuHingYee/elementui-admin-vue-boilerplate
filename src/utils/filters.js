import Vue from 'vue';
import { toThousands } from '@/utils/tools';
import dayjs from 'dayjs';
// 格式化时间
Vue.filter('formatTime', function (dataStr) {
  return dayjs(dataStr).format('YYYY-MM-DD HH:mm:ss');
});
// 格式化日
Vue.filter('formatDay', function (dataStr) {
  return dayjs(dataStr).format('YYYY-MM-DD');
});
// 格式化月份
Vue.filter('formatMonth', function (dataStr) {
  return dayjs(dataStr).format('YYYY-MM');
});
// 格式化年份
Vue.filter('formatYear', function (dataStr) {
  return dayjs(dataStr).format('YYYY');
});
// 格式化数字千份位
Vue.filter('toThousands', function (dataStr, dot) {
  return toThousands(dataStr, dot);
});
