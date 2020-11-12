import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./routes";
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "@/store";

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)

Vue.component('leaf1', {
  props: {
    picture: Object
  },
})

Vue.component('leaf2', {
  props: {
    picture: Object
  },
})

Vue.component('leaf3', {
  props: {
    picture: Object
  },
})

Vue.component('leaf4', {
  props: {
    picture: Object
  },
})

Vue.component('leaf5', {
  props: {
    picture: Object
  },
})

Vue.component('appBar')

Vue.component('navDrawer')