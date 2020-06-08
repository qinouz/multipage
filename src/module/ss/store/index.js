import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutations'


Vue.use(Vuex);

let state = {
  token: '',
  corpid: '',
  appid: '',
};
var store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});


export default store
