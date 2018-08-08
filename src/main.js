import Vue from 'vue'
import App from './App.vue'
import VueFirebase from './firebase'
import './registerServiceWorker'
import './assets/scss/app.scss'

Vue.config.productionTip = false
Vue.use(VueFirebase)

new Vue({
  render: h => h(App)
}).$mount('#app')
