import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import router from './router'

Vue.use(Vuelidate)

Vue.prototype.$http = axios;

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
