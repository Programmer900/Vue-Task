import Vue from 'vue'
import Router from 'vue-router'
import Create from './views/Create.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Create Task',
      component: Create
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('./views/List.vue')
    },
    {
      path: '/task/:id',
      name: 'Task',
      component: () => import('./views/Task.vue')
    }
  ]
})
