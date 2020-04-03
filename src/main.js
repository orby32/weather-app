import Vue from 'vue'
import App from './App.vue'
import store from './store';

Vue.config.productionTip = false

Vue.filter('celcius', function(value) {
  return value + '°C';
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
