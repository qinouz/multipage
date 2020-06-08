<template>
  <div id="app" >
    <!--<keep-alive :include="['qr-code', 'my_corporate_information']">-->
      <router-view ></router-view>
      <!--<router-view :key="$route.fullPath"></router-view>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
    },
    methods: {
      getuserInfo () {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/sass/public.scss";
  /*@import "../../common/sass/reset.scss";*/
  * {
    -webkit-touch-callout:none;
    box-sizing:border-box;
    -webkit-text-size-adjust:none;
    -webkit-tap-highlight-color:transparent;
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
