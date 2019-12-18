import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles'
import AsyncComputed from 'vue-async-computed'
import Unicon from 'vue-unicons'
import { uniVolume } from 'vue-unicons/src/icons'

Unicon.add([uniVolume])
Vue.use(Unicon)

Vue.use(AsyncComputed)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
