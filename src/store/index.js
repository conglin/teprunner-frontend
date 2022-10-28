import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";
import state from "./state.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
