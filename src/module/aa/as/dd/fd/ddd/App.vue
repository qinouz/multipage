<template>
  <div id="app">
    <!--<keep-alive :include="['qr-code', 'my_corporate_information']">-->
    <!--<router-view :key="$route.fullPath"></router-view>-->
    <!--</keep-alive>-->sasasa
    <div class="img"></div>
    <button @click="gopath">banner 页面</button>
  </div>
</template>

<script>

  export default {
    name: 'App',
    created() {
    },
    components: {},
    computed: {},
    mounted() {
    },
    methods: {
      sss(num) {
        this.$http.post("/ashx/PersEmploy.ashx", {
            action: "persSelectByHand",
            txtPinyongCode: "" + num,
            txtIDCard: "130181198501156118",
            IDCardTypeNum: "1",
            QYID: "0bac66cc-17b8-4e24-a97f-7a9195c3e7f3"
          }).then(res => {
            if (res.data != "noMatch") {
              alert(num)
              console.log(num)
            }else {
              setTimeout(() => {
                num++;
                this.sss(num);
              }, 2000)
            }
          })
      },
      getuserInfo() {

      },
      gopath() {
        // utils.jump('js_pageLogin');
        //
        window.location.href = "ss.html"
      }
    }
  }
</script>
<style></style>
<style lang="scss" scoped>
  .img {
    width: 300px;
    height: 300px;
    background-image: url("~@/assets/ssssss.jpg");
  }

  * {
    -webkit-touch-callout: none;
    box-sizing: border-box;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    font-family: sans-serif; /* 1 */
    /*line-height: 1.15; !* 2 *!*/
    -ms-text-size-adjust: 100%; /* 3 */
    -webkit-text-size-adjust: 100%; /* 3 */
  }

  body {
    font-size: 12px !important;
  }

  #app {
    min-height: 100vh;
    background: rgb(246, 246, 246);
  }
</style>
