import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/layout/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagsModel from "@/model/tagsModel.ts";
import billsModel from "@/model/billsModel.ts";



Vue.config.productionTip = false
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

window.tags = tagsModel.fetch();
window.billList = billsModel.fetch();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
