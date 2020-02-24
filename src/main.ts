import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Icon from '@/components/common/Icon.vue'
import HeaderLayout from "@/components/layout/HeaderLayout.vue";
import Button from '@/components/common/Button.vue'
Vue.config.productionTip = false

Vue.component('Icon', Icon)
Vue.component('HeaderLayout', HeaderLayout)
Vue.component('Button', Button)

window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 100) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
