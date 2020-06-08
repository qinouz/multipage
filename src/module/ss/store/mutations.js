export default {
  set_anystate: (state, obj) => {
    state[obj.name] = obj.value;   // 通用方法
  },
  // 设置token
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  DEL_TOKEN(state) {
    state.token = '';
    // state.tokenTime = null;
    // state.userInfo = null;
  },
  SET_USERINFO: (state, data) => {
    state.userInfo = data;
  },
  set_baseUserInfo: (state, data) => {
    state.baseUserInfo = data;
  },
  set_corpid: (state, data) => {
    state.corpid = data.state;
  },
  set_wxSDK: (state, data) => {                //   设置微信SDK
    state.set_wxSDK = data
  },
  set_isWxSdkConfig: (state, data) => {         //   微信SDK 是否 Config
    state.isWxSdkConfig = data;
  },
  set_whitchSales: (state, data) => {              // 设置会话对象
    state.whitchSales = data;
  },
  set_whitchUser_id: (state, data) => {              // 设置会话对象
    state.whitchUser_id = data;
  },
  set_salesAccountImage: (state, data) => {        // 设置会话对象头像
    state.salesAccountImage = data
  },
  set_isLoginIM: (state, data) => {
    state.isLoginIM = data
  },
  setsyncMsgs: (state, data) => {      // 未读消息
    state.syncMsgs = data
  },
  delsyncMsgs: (state, data) => {       // 删除某个未读计数
    if (state.syncMsgs[data]) {
      let copyobj = JSON.parse(JSON.stringify(state.syncMsgs));  // copy 对象 否则vue 响应式 有问题
      delete copyobj[data];
      state.syncMsgs = copyobj;
    }
  },
  updatesyncMsgs: (state, data) => {   // 更新未读消息
    if (state.syncMsgs[data.fromAccountNick]) {
      state.syncMsgs[data.fromAccountNick] += 1;
    } else {
      state.syncMsgs[data.fromAccountNick] = 1;
    }
  },
  setContactList: (state, data) => {           // 消息列表
    state.contactList = data
  },
  setTableIndex: (state, data) => {           // 设置下导航索引
    state.tabIndex = data;
  },
  setPageTitle(state, data) {
    state.pageTitle = data
  },

}
