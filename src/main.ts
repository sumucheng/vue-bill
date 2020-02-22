import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Icon from '@/components/common/Icon.vue'
import Back from "@/components/common/Back.vue";
import Button from '@/components/common/Button.vue'
Vue.config.productionTip = false

Vue.component('Icon', Icon)
Vue.component('Back', Back)
Vue.component('Button', Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
