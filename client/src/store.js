import feathersVuex from "feathers-vuex";
import Vue from "vue";
import Vuex from "vuex";
import feathersClient from "./feathers";

const { service } = feathersVuex(feathersClient, { idField: "_id" });

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [service("entry")]
});
