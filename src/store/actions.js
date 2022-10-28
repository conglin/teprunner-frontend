const actions = {
  getJenkinsDataAsync(context, http) {
    http.get("/teprunner/jenkins/get-jobs").then(response => {
      context.commit("getJenkinsData", response);
    });
  },
};
export default actions;
