export default {
  getJenkinsData: state => {
    return state.jenkinsData.filter((item, index) => [3, 4, 5].includes(index));
  },
};
