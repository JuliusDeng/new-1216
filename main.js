import Vue from 'vue'
import App from './App'

// 引入vuex
import store from './store'
// main.js
import uView from "uview-ui";
Vue.use(uView);
// utils
import util from 'utils/util'
Vue.prototype.$util = util;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
// 请求全局封装
import httpInterceptor from '@/common/http.interceptor'
Vue.use(httpInterceptor, app)
app.$mount()
