import { axiosInstance } from "../service/axios";

//获取 jenkins 列表的数据
export async function GetJenkinsData() {
  return await axiosInstance.get("/teprunner/jenkins/get-jobs");
}

//构建 jenkins
export async function BuildJenkins(params = {}) {
  console.log(params, "params");
  return await axiosInstance.post("/teprunner/jenkins/build-job", params);
}

//获取 jenkins 参数列表
export async function GetJenkinsParamList(jenkinsName) {
  return await axiosInstance.get("/teprunner/jenkins/get-job-params/" + jenkinsName);
}
