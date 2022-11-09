<template>
  <div>
    <el-card>
      <el-table :data="getJenkinsData" :header-cell-style="{ 'text-align': 'center' }" border stripe fit>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <!--  eslint-disable-next-line -->
            <span :style="{ 'color': scope.row.color }">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template slot-scope="scope">
            <el-link :href="scope.row.url" target="_bank" type="primary">
              {{ decodeURI(scope.row.url.slice(25)) }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="openEditParam(scope.row)">运行</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 参数配置对话框 -->
    <el-dialog title="参数配置" :visible.sync="paramDialogVisible" width="500px">
      <el-form ref="editParamFormRef" :model="getJenkinsParam" label-width="80px">
        <el-form-item v-for="(param, nameKey, index) in getJenkinsParam.data" :key="index" :label="keyNames[nameKey]">
          <!--  StringParameterDefinition-->
          <div v-if="param.type === 'StringParameterDefinition'">
            <el-input
              v-for="(item, key, index) in param?.data || ' '"
              :key="index"
              v-model="jenkinsJob.job_params[nameKey]"
              placeholder="请输入内容"
            ></el-input>
          </div>

          <!-- BRANCH 区域 GitParameterDefinition-->
          <div v-if="param.type === 'GitParameterDefinition'">
            <el-select v-model="jenkinsJob.job_params[nameKey]" filterable>
              <el-option
                v-for="(item, key, index) in param.data"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- CONFIG 区域 ChoiceParameterDefinition-->
          <div v-if="param.type === 'ChoiceParameterDefinition'">
            <el-select v-model="jenkinsJob.job_params[nameKey]" filterable>
              <el-option v-for="(item, key, index) in param.data" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <!-- IS_SEND_TO_APP_STORE 区域 BooleanParameterDefinition-->
          <div v-if="param.type === 'BooleanParameterDefinition'">
            <el-checkbox v-model="jenkinsJob.job_params[nameKey]">IS_SEND_TO_APP_STORE</el-checkbox>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="buildJenkinsJob">运行</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BuildJenkins } from "../../service/api";
export default {
  data() {
    return {
      BRANCHS: ["origin/develop_1.3.1", "origin/develop/1.3.1", "origin/master"],
      paramDialogVisible: false,
      editParamForm: [{ allValueItems: { values: [] } }, { choices: [] }],
      jenkinsJob: {
        job_name: "",
        job_params: {},
      },
      keyNames: {
        BRANCH: "分支",
        CONFIG: "配置",
        IS_SEND_TO_APP_STORE: "是否",
        app_path: "",
        project_patt: "",
        udid: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getJenkinsData", "getJenkinsParam"]),
  },
  mounted() {
    this.getJenkins();
  },
  methods: {
    ...mapActions(["getJenkinsDataAsync", "getJenkinsParamAsync"]),
    async getJenkins() {
      try {
        await this.getJenkinsDataAsync();
      } catch (error) {
        console.log("获取 jenkins数据失败", error);
        this.$message.error("获取 jenkins数据失败");
      }
    },
    async buildJenkinsJob() {
      try {
        await BuildJenkins(this.jenkinsJob);
        this.$message.success("构建成功");
      } catch (error) {
        this.$message.error("构建失败");
      }
    },
    buildSuggestions(queryString, collBack) {
      const buildSuggestions = [{ value: "origin/master" }];
      collBack(buildSuggestions);
    },
    async openEditParam(jenkinsData) {
      try {
        await this.getJenkinsParamAsync(jenkinsData.name);
        this.jenkinsJob.job_params = this.getJenkinsParam.defaultParameterValue || {};
        // console.log(this.jenkinsJob, "jenkinsJob");
        this.jenkinsJob.job_name = jenkinsData.name;
        this.paramDialogVisible = true;
      } catch (error) {
        console.log("获取参数失败", error);
        this.$message.error("获取参数失败");
      }
    },
  },
};
</script>

<style></style>
