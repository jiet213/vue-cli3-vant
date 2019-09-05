import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import axios from './api/axios'
import 'amfe-flexible';
import { Dialog, Toast } from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
// 全局注册
Vue.use(Dialog);
Vue.use(Toast);

/*axios-config*/
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
