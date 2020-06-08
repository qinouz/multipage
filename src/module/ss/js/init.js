import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import $ from 'jquery'
window.$ = $;   // 引入 jquery
Vue.use(Vant);
Vue.prototype.$toast.setDefaultOptions('loading', { forbidClick: true });

import 'amfe-flexible'


