// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import api from './api'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import Home from './components/HelloFromVux'
import 'lib-flexible/flexible.js'
import router from './router'

/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)

import  { ToastPlugin,Confirm } from 'vux'
Vue.use(ToastPlugin);
Vue.component('confirm', Confirm)

import { LoadMore } from 'vux'
Vue.component('load-more', LoadMore)


import { Loading } from 'vux'

Vue.component('loading', Loading)




import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// FastClick.attach(document.body)

window.API = api;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
