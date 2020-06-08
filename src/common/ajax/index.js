
import axios from 'axios'

// 设置全局axios默认值
axios.defaults.timeout = 55000; // 5000的超时验证

// 跨域带cooki
axios.defaults.withCredentials = true;

// 创建一个axios实例
const instance = axios.create();

var path = process.env.VUE_APP_SERVICE_URL;

instance.defaults.baseURL = path;


// request拦截器
let conf = null;
instance.interceptors.request.use(
  config => {
    config.headers['Cache-Control'] = 'no-cache';
    return config
  },
  err => {
    return Promise.reject(err)
  }
);

instance.interceptors.response.use(
  response => {
    return response
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log(401)
      }
    }
    return Promise.resolve(error.response)
  }
);


export {instance as mqAjax}

