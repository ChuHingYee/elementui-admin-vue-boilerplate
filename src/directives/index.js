import Vue from 'vue';
import format from './format.js';
import formatK from './formatK.js';
import authBtn from './authBtn';
import debounce from './debounce';
// import clipboard from './clipboard'
Vue.directive('format', format);
Vue.directive('formatK', formatK);
Vue.directive('authBtn', authBtn);
Vue.directive('debounce', debounce);
