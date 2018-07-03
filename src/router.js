import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import A1 from './views/A/1.vue'
import A2 from './views/A/2.vue'
import A3 from './views/A/3.vue'
import B1 from './views/B/1.vue'
import B2 from './views/B/2.vue'
import B3 from './views/B/3.vue'
import C1 from './views/C/1.vue'
import C2 from './views/C/2.vue'
import C3 from './views/C/3.vue'

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
    },
    {
      path: '/B/2',
      name: 'B2',
      component: B2
    },
    {
      path: '/B/3',
      name: 'B3',
      component: B3
    },
    {
      path: '/C/1',
      name: 'C1',
      component: C1
    },
    {
      path: '/C/2',
      name: 'C2',
      component: C2
    },
    {
      path: '/C/3',
      name: 'C3',
      component: C3
    }
  ]
})
