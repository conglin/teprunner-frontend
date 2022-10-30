import { GetJenkinsData } from "../service/api";

export default {
  getJenkinsDataAsync(context) {
    const { data } = GetJenkinsData();
    context.commit("getJenkinsData", data);
  },
};
