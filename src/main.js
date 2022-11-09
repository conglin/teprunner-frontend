import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./service/axios";
import Element from "element-ui";
import store from "./store/index";

import "./assets/css/common.scss";
import "./assets/css/font.css";

import IconFont from "@/components/IconFont.vue";
import "@/assets/iconfont/iconfont";
Vue.component("icon-font", IconFont);

import { onResponse, notifyMessage } from "./utils/commonMethods";
Vue.prototype.$notifyMessage = notifyMessage;
Vue.prototype.$handleResponse = onResponse;

import Pagination from "@/components/Pagination";
Vue.component("vue-pagination", Pagination);

import Highlight from "@/assets/js/highlight.js";
Vue.use(Highlight);

import _ from "lodash";
Vue.prototype.$_ = _;

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(axios);

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
export default app;
