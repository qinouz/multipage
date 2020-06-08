#!/usr/bin/env node
const service = require('./my-vue-cli-service');

service().then(result => {
  console.log("构建完成回调函数！！")
})
