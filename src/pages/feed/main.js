import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.component('leaf', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
  template: '<leaf/>'
})