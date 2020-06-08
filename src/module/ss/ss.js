// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {mqAjax} from "./js/ajax";
// import Vuex from 'vuex'
Vue.config.productionTip = false;
import './js/init'

Vue.prototype.$http = mqAjax;
//创建bus事件总线
// Vue.prototype.$bus = new Vue();
Vue.prototype.$utils = {
  urlRequest: function (data) {
    return "?request=" + encodeURIComponent(data);
  }
};

// var app = new Vue({
//   el: '#app',
//   store,
//   router,
//   components: {App},
//   template: '<App/>'
// });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
