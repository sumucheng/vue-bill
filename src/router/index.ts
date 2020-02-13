import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Record from '@/views/Record.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'
import TagStatistics from '@/views/TagStatistics.vue'
import Category from '@/views/Category.vue'

const routes = [
  {
    path: '/',
    redirect: '/statistics/detail'
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
    path: '/statistics/detail',
    component: Statistics
  },
  {
    path: '/statistics/category',
    component: Category
  },
  {
    path: '/statistics/:id',
    component: TagStatistics
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
