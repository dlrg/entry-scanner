import Chart from "chart.js";
import Vue from "vue";
import VueChartkick from "vue-chartkick";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(store);
Vue.use(VueChartkick, { adapter: Chart });

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
