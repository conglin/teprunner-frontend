import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jenkinsData: [],
  },
  getters: {
    getJenkinsData: state => {
      return state.jenkinsData.filter((item, index) => [3, 4, 5].includes(index));
    },
  },
  mutations: {
    getJenkinsData(state, response) {
      state.jenkinsData = response.data.data;
    },
  },
  actions: {
    getJenkinsDataAsync(context, http) {
      http.get("/teprunner/jenkins/get-jobs").then(response => {
        context.commit("getJenkinsData", response);
      });
    },
  },
  modules: {},
});
