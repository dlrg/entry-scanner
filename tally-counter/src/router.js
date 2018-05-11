import Vue from 'vue'
import Router from 'vue-router'
import TallyCounter from './views/TallyCounter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'counter',
      component: TallyCounter
    }
  ]
})
