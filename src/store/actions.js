import { GetJenkinsData } from "../service/api";

export default {
  async getJenkinsDataAsync(context) {
    const { data } = await GetJenkinsData();
    context.commit("getJenkinsData", data);
  },
};
