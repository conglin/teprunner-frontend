const mutations = {
  getJenkinsData(state, response) {
    state.jenkinsData = response.data;
  },
};
export default mutations;
