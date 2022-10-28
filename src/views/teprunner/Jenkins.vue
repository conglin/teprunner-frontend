<template>
  <div>
    <el-card>
      <el-table :data="jenkinsData" border stripe fit>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <!--  eslint-disable-next-line -->
            <span :style="{ 'color': scope.row.color }">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" target="_bank" type="primary">
              {{ decodeURI(scope.row.url.slice(25)) }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="输入">
          <template slot-scope="scope">
            <el-autocomplete v-model="BRANCHS[scope.$index]" :fetch-suggestions="buildSuggestions"></el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="sendJenkins(scope.row, scope.$index)">运行</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jenkinsData: [],
      buildParam: {
        job_name: "",
        job_params: {
          BRANCH: "",
        },
      },
      BRANCHS: [],
    };
  },
  created() {
    this.getJenkinsData();
  },
  methods: {
    getJenkinsData() {
      this.$http.get("/teprunner/jenkins/get-jobs").then(response => {
        this.jenkinsData = response.data.data;
        this.jenkinsData.forEach((element, index) => {
          this.BRANCHS[index] = "origin/master";
        });
        console.log("获取jenkinsData", this.jenkinsData);
      });
    },
    sendJenkins(jenkins, index) {
      console.log(jenkins, index, this.buildParam, this.buildParam.job_params.BRANCH[index]);
      this.$http
        .post("/teprunner/jenkins/build-job", {
          job_name: jenkins.name,
          job_params: {
            BRANCH: this.BRANCHS[index],
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    buildSuggestions(queryString, collBack) {
      const buildSuggestions = [{ value: "origin/master" }, { value: "origin/" }];
      collBack(buildSuggestions);
    },
  },
};
</script>

<style></style>
