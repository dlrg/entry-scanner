import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import feathersClient from './feathers-client'

['connect', 'reconnect'].forEach(event => feathersClient.io.on(event, () => store.commit('setConnection', true)));
['connect_error', 'reconnect_error'].forEach(event => feathersClient.io.on(event, () => store.commit('setConnection', false)))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
