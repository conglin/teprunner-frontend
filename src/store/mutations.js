const mutations = {
  getJenkinsData(state, response) {
    state.jenkinsData = response.data.data;
  },
};
export default mutations;
