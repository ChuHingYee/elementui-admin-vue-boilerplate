import Vue from 'vue';
import VueStorage from 'vue-ls';
import config from '@/configs/defaultSettings';

Vue.use(VueStorage, config.vueLsOptions);
