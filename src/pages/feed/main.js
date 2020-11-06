import Vue from 'vue'
import App from './App.vue'
import vuetify from '../../plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)

Vue.component('leaf1', {
  props: {
    picture: String
  },
})

Vue.component('leaf2', {
  props: {
    picture: String
  },
})

Vue.component('leaf3', {
  props: {
    picture: String
  },
})

Vue.component('leaf4', {
  props: {
    picture: String
  },
})

Vue.component('leaf5', {
  props: {
    picture: String
  },
})