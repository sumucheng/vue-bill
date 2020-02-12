import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/layout/Layout.vue'
import Icon from '@/components/Icon.vue'
import billsModel from "@/model/billsModel.ts";

Vue.config.productionTip = false

Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

// bills
window.billList = billsModel.fetch();
window.createBill = (bill) => {
  billsModel.add(bill);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
