// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'
import store from "./store"
import VueCookies from 'vue-cookies'
// import echarts from 'echarts'
import * as echarts from 'echarts';


Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.prototype.$http= axios
Vue.prototype.$axios = http
Vue.prototype.$bus = new Vue();   //初始化事件总线
Vue.prototype.$echarts = echarts


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //注册状态管理器
  components: { App },
  template: '<App/>'
})
