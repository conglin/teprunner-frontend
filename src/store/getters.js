export default {
  getJenkinsData: state => {
    const nameArray = [
      "Build ToC Android Testing",
      "Build ToC iOs Testing",
      "build-ding-assitant-plugin",
      "android-monkey-tests",
      "ios-monkey-tests",
      "tanxin-测试自动化",
      "tanxin-钉钉录制脚本",
    ];
    return state.jenkinsData.filter(item => nameArray.includes(item.name));
  },
  getJenkinsParam: state => state.jenkinsParam,
};
