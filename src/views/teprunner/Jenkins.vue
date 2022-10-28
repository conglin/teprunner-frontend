<template>
  <div>
    <el-card>
      <el-table :data="getJenkinsData" border stripe fit>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      BRANCHS: [],
    };
  },
  computed: {
    ...mapGetters(["getJenkinsData"]),
  },
  mounted() {
    this.getJenkins();
  },
  methods: {
    ...mapActions(["getJenkinsDataAsync"]),
    getJenkins() {
      this.getJenkinsDataAsync(this.$http);
      this.BRANCHS = Array(this.getJenkinsData.length).fill("origin/master", 0);
    },
    sendJenkins(jenkins, index) {
      this.$http
        .post("/teprunner/jenkins/build-job", {
          job_name: jenkins.name,
          job_params: {
            BRANCH: this.BRANCHS[index],
          },
        })
        .then(response => {
          this.$message.success("构建成功");
          console.log(response);
        })
        .catch(error => {
          this.$message.error("构建失败");
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
