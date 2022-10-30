import axios from "axios";

//获取 jenkins 列表的数据
export async function GetJenkinsData() {
  return await axios.get("/teprunner/jenkins/get-jobs");
}

//构建 jenkins
export async function BuildJenkins(params = {}) {
  return await axios.post("/teprunner/jenkins/build-job", params);
}
