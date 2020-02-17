import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
Vue.use(VueRouter)

import Record from '@/views/Record.vue'
import Labels from '@/views/Labels.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'
import TagStatistics from '@/views/TagStatistics.vue'
import BillDetail from '@/views/BillDetail.vue'
import Statistics from '@/views/Statistics.vue'
import Annual from '@/views/Annual.vue'
import Setting from '@/views/Setting.vue'
import Budget from '@/views/Budget.vue'

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
    path: '/record/:id',
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
    path: '/setting',
    component: Setting
  },
  {
    path: '/annualBill',
    component: Annual
  },
  {
    path: '/budget',
    component: Budget
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
