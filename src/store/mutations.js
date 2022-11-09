import App from "../main";

const mutations = {
  getJenkinsData(state, response) {
    state.jenkinsData = response.data;
  },
  getJenkinsParam(state, response) {
    const jenkinsParamType = {
      GitParameterDefinition: "allValueItems.values",
      ChoiceParameterDefinition: "choices",
      BooleanParameterDefinition: "defaultParameterValue.value",
    };
    const jenkinsParam = new Object();
    // 生成动态对象 jenkinsParam
    response.data.forEach(element => {
      // reduce
      //设置 jenkinsParam.data.?.data
      App.$_.set(
        jenkinsParam,
        "data." + element.name + ".data",
        App.$_.get(element, App.$_.get(jenkinsParamType, element.type)),
      );
      //设置 jenkinsParam.data.?.type
      App.$_.set(jenkinsParam, "data." + element.name + ".type", element.type);
      //设置 jenkinsParam.defaultParameterValue
      App.$_.set(
        jenkinsParam,
        "defaultParameterValue." + element.defaultParameterValue.name,
        element.defaultParameterValue.value,
      );
    });
    state.jenkinsParam = jenkinsParam;
    // console.log(jenkinsParam, "jenkinsParam");
  },
};
export default mutations;
