
import axios from 'axios'
import store from '../../store'
import qs from 'qs'
import router from '../../router'

// 设置全局axios默认值
axios.defaults.timeout = 55000; // 5000的超时验证

// 跨域带cooki
axios.defaults.withCredentials = true;

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 创建一个axios实例
const instance = axios.create();

// var path = location.protocol + "//" + location.host + "/";
var path = process.env.VUE_APP_SERVICE_URL;
// const path = process.env.HOST_API;
// var path = "http://testguanwang.scrmtech.com/";
if (location.host.indexOf('localhost') >= 0) {
  // path = path + 'm-api'
}
instance.defaults.baseURL = path;

// instance.defaults.headers['Content-Type'] = 'application/json;char35set=UTF-8'
// instance.defaults.baseURL = 'http://192.168.0.9:38080'
// instance.defaults.baseURL = 'http://192.168.5.10:38080';
// var path = location.protocol + "//" + location.host + "/";
// if (location.host.indexOf('localhost') >= 0) {
//   // instance.defaults.baseURL = path + "mb-api";
// }

// request拦截器
let conf = null;
instance.interceptors.request.use(
  config => {
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
    conf = config;
    if (config.method == 'post') {
      let falg = true;
      if (config.headers['Content-Type'] == 'multipart/form-data') {
        falg = false;
      }
      if (falg) {
        // config.data = qs.stringify(config.data)
      }
    }
    // config.headers.corpid = store.state.corpid;
    if (store.state.token) {
      // config.headers.Authorization = `Bearer ${store.state.token}`
      config.headers.token = store.state.token
    }
// if (store.state.gameId && config.method === 'post' && store.state.gameId !== -1) {
//   config.data.gameID = store.state.gameId
// }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      // store.commit('DEL_TOKEN')
      // store.commit('replaceUrl', router.currentRoute.fullPath)
    }
    return response
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log(401)
      }
    }
    // var ff= Vue
    // debugger
    // Vue.$toast.clear();   //  关闭loading
    return Promise.resolve(error.response)
  }
)


export {instance as mqAjax}

