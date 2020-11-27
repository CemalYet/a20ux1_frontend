import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./routes";
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "@/store";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDbKibifXFsF7V5MAkALsXbG6B3P7ELwhY",
  }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)
