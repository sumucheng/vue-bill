import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Record from '@/views/Record.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'

const routes = [
  {
    path: '/',
    redirect: './statistics'
  },
  {
    path: '/record',
    component: Record
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
