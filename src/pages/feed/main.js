import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.component('leaf1', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
})

Vue.component('leaf2', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
})

Vue.component('leaf3', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
})

Vue.component('leaf4', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
})

Vue.component('leaf5', {
  props: {
    leafSVG: Object,
    discoveries: Object
  },
})