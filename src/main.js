import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import Toasted from 'vue-toasted';
 
Vue.use(Toasted, {
  duration: 1500
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
