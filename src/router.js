import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import A1 from './views/A/1.vue'
import A2 from './views/A/2.vue'
import A3 from './views/A/3.vue'
import B1 from './views/B/1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/A/1',
      name: 'A1',
      component: A1
    },
    {
      path: '/A/2',
      name: 'A2',
      component: A2
    },
    {
      path: '/A/3',
      name: 'A3',
      component: A3
    },
    {
      path: '/B/1',
      name: 'B1',
      component: B1
    }
  ]
})
