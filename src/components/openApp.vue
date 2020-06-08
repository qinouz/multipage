<template>
  <div>
    <!-- 分享后的遮罩层和按钮 -->
    <div id="zhezhao">
      <img alt="" src="./assets/img/guide.png" height="100%" width="100%" style="margin:0;padding:0;">
    </div>
    <div id="bottom">
      <img id="imgg" alt="" src="./assets/img/zhihuicheng.jpg" width="100%"/>
      <div id="left" @click="open"></div>
      <div id="close" @click="bottomHide">
        <img id="closeimg" alt="" src="./assets/img/close.png">
      </div>
    </div>
  </div>                     
</template>

<script>
  var callapp2 = require("../common/js/callapp/callapp2");
  import $ from 'jquery'

  var u = '';
  var appType = "";

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return null; //返回参数值
  }

  //微信提示用浏览器打开遮罩层
  function bottomShow() {
    $("#bottom").show();
  }

  function bottomHide() {
    $("#bottom").hide();
  }

  export default {
    name: 'openApp',
    props: {},
    data() {
      return {}
    },
    components: {},
    computed: {},
    created() {
    },
    mounted() {
      window.onload = function () {
        u = navigator.userAgent;
        appType = getUrlParam('appType');
        if (appType == 'zhc') {//智汇橙APP
          console.log("appType", appType)
          judge(appType);
        }
      };

//判断打开的机器，手机微信和QQ打开显示遮罩层提示用户用手机浏览器打开，手机浏览器打开显示底部唤起按钮
      function judge(appType) {
        u = navigator.userAgent;
        if (appType != null || appType != '') {//手机浏览器，电脑
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('iPhone') > -1) {//手机浏览器
            bottomShow();
          }
        }
      }
    },
    methods: {
      bottomHide,
      open() {
        callapp2.openAPP();
      },
    }
  }
</script>

<style scoped lang="scss">
  .whole {
    padding: 0px 15px;
    margin-bottom: 15px;
  }

  .whole p {
    line-height: 1.8;
    margin-top: 5px;
    font-size: 1.6rem;
    color: #333333;
    word-break: break-all;
    word-wrap: break-word;
    overflow: auto;
  }

  .news_biaoti {
    color: #222222;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 2rem;
  }

  .fu_title {
    margin-top: 20px;
  }

  .time {
    color: #616161;
    font-size: 1.3rem;
  }

  .author {
    color: #616161;
    font-size: 1.5rem;
    margin-left: 6px;
  }

  /*����*/
  .news_content {
    margin-top: 30px;
  }

  .news_content p {
    line-height: 1.8;
    font-size: 1.6rem;
    color: #4c4c4c;
    margin-top: 15px;
    word-break: break-all;
    word-wrap: break-word;
    overflow: auto;
  }

  .jiacu {
    font-weight: bold;
  }

  .news_content img {
    width: 100%;
    margin-top: 15px;
  }

  .news_content p, .news_content span {
    line-height: 30px;
    margin: 0.1rem 0;
  }

  .news_content img {
    margin: 0.1rem 0;
  }

  #zhezhao {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1000;
  }

  #bottom {
    width: 100%;
    opacity: 0.8;
    filter: alpha(opacity=30);
    z-index: 99999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    font-size: 0;
  }

  #bottom.img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #close {
    right: 0;
    top: 0;
    width: 12%;
    height: 100%;
    position: absolute;
    z-index: 110;
    text-align: center;
    padding-top: 7.5%;
  }

  #closeimg {
    z-index: 120;
    width: 50%;
  }

  #left {
    left: 0;
    top: 0;
    width: 88%;
    height: 100%;
    position: absolute;
    z-index: 110;
  }

</style>
