import feathersVuex from 'feathers-vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import feathersClient from './feathers-client'

const { service } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: false
  },
  mutations: {
    setConnection (state, payload) {
      state.connection = payload
    }
  },
  actions: {
  },
  plugins: [
    service('statistics'),
    service('station'),
    service('entry')
  ]
})
