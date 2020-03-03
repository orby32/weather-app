import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('celsius', function(value) {
  return value + '°C';
})

new Vue({
  render: h => h(App),
}).$mount('#app')
