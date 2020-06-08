import Vue from 'vue'
import {Toast} from 'vant';
import Router from 'vue-router'

import index from "../pages/index"; //首页


Vue.use(Router);

var routes = [
  {
    path: '/',
    component: index,
    meta: {
      title: 'index',
    },
  },
];

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (process.env.NODE_ENV == 'development') {
    next()
    return
  }



});
export default router
