import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Record from '@/views/Record.vue'
import Labels from '@/views/Labels.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'
import TagStatistics from '@/views/TagStatistics.vue'
import BillDetail from '@/views/BillDetail.vue'
import Statistics from '@/views/Statistics.vue'

const routes = [
  {
    path: '/',
    redirect: '/statistics'
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
    component: Statistics,
  },
  {
    path: '/statistics/:id',
    component: TagStatistics
  },
  {
    path: '/bill/:id',
    component: BillDetail
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
