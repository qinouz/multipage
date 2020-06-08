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
  import "../common/js/callapp/callapp2"
  import $ from 'jquery'

  var app = '';
  var u = '';
  var pmcomid = '';
  var mpid = $(".mpid").html();
  var tag = $(".tag").html();
  var urlName = $(".urlName").html();
  var appType = "";
  var IOSAppDownLoad = '';
  var AZAppDownLoad = '';

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

  function hide() {
    $("#zhezhao").hide();
  }

  //遮罩层显示，滚动条取消
  function show() {
    $("#zhezhao").show();
    $("body").css("overflow-y", "hidden");
    $('body').bind("touchmove", function (e) {
      e.preventDefault();
    });
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
      console.log("openAppYuanMa.js",)
      window.onload = function () {
        console.log("openAppYuanMa.js  window.onload",)
        var title = $(".title").html();
        var url = $(".url").html();
        var picture = $(".picture").html();
        var content = $(".whole").html();
        u = navigator.userAgent;
        appType = getUrlParam('appType');
        if ($(".urlName").length > 0) {
          pmcomid = $(".urlName").html();
        }
        if (appType == 'zhc') {//智汇橙APP
          console.log("appType", appType)
          judge(appType);
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
            app = "zhihuicheng://" + urlName + "?data={\"tag\":\"" + tag + "\",\"id\":\"" + mpid + "\"}";
            console.log("安卓app", app)
          } else if (u.indexOf('iPhone') > -1) {
            app = "zhihuicheng://webview?data={\"tag\":\"" + tag + "\",\"id\":\"" + mpid + "\"}";
            console.log("iphoneapp", app)
          }
          AZAppDownLoad = "http://crm.isolomo.com.cn/xs/zhc.html";
          IOSAppDownLoad = "http://crm.isolomo.com.cn/xs/zhc.html";
        }
      }

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
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('iPhone') > -1) {//手机浏览器，唤起app
          if (appType == 'tianshan') {//天山海慧APP
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
              app = "haihui://productdetail?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            } else if (u.indexOf('iPhone') > -1) {
              app = "TianShanHaiHui://webview?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            }
            AZAppDownLoad = 'http://182.92.169.167:802/downts.html';
            IOSAppDownLoad = "https://itunes.apple.com/cn/app/tian-shan-hai-hui/id1025669863?mt=8";
          } else if (appType == 'mc') {//秒控生活APP
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
              app = "miaokong://productdetail?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            } else if (u.indexOf('iPhone') > -1) {
              app = "MiaoKongShengHuo://webview?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            }
            AZAppDownLoad = "http://crm.isolomo.com.cn/xs/down.html";
            IOSAppDownLoad = "https://itunes.apple.com/cn/app/miao-kong-sheng-huo/id981787586?mt=8";
          } else if (appType == 'henghui') {//恒辉物业宝APP
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓参数不同，从页面获取
              app = "henghui://productdetail?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            } else if (u.indexOf('iPhone') > -1) {
              app = "HengHuiWuYeBao://webview?data={\"tag\":\"product\",\"id\":\"" + mpid + "\"}";
            }
            AZAppDownLoad = "http://182.92.169.167:802/downhh.html";
            IOSAppDownLoad = "https://itunes.apple.com/cn/app/heng-hui-wu-ye-bao/id1065389697?mt=8";
          }
        }

        //唤起app
        if (u.indexOf('MicroMessenger') > -1 || u.indexOf('QQ/') > -1) { //是否微信打开
          show();
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
          var timeout, t = 1000, hasApp = true;
          setTimeout(function () {
            if (hasApp) {
              $('#dl_app').hide();
            } else {
              $('#dl_app').show();
              window.location = AZAppDownLoad;
            }
          }, 2000)

          // noinspection JSAnnotator
          function openApp() {
            var t1 = Date.now();
            var ifr = $('<iframe id="ifr" ></iframe>');
            ifr.attr('src', app);
            ifr.hide();
            $('body').append(ifr);
            timeout = setTimeout(function () {
              try_to_open_app(t1);
            }, t);
          }

          // noinspection JSAnnotator
          function try_to_open_app(t1) {
            var t2 = Date.now();
            if (!t1 || t2 - t1 < t + 200) {
              hasApp = false;
            }
          }

          openApp();
        } else if (u.indexOf('iPhone') > -1) {//IOS
          // noinspection JSAnnotator
          function applink() {
            window.location = app;
            var clickedAt = +new Date;
            setTimeout(function () {
              !window.document.webkitHidden && setTimeout(function () {
                if (+new Date - clickedAt < 2000) {
                  window.location.href = IOSAppDownLoad;
                }
              }, 500);
            }, 1000)
          }

          applink();
        }
      }
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
