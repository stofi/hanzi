import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/tailwind.css'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
