import { GetJenkinsData, GetJenkinsParamList } from "../service/api";

export default {
  async getJenkinsDataAsync(context) {
    const { data } = await GetJenkinsData();
    context.commit("getJenkinsData", data);
  },
  async getJenkinsParamAsync(context, param) {
    const { data } = await GetJenkinsParamList(param);
    context.commit("getJenkinsParam", data);
  },
};
