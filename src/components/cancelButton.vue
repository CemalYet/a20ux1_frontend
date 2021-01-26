<template>
  <v-app-bar-nav-icon @click.stop="cancel">
    <v-icon large color=var(--dark-color)>{{ mdiClose }}</v-icon>
  </v-app-bar-nav-icon>
</template>

<script>
import {mdiClose} from '@mdi/js';
export default {
  name: "cancelButton",

  data:() => ({
    mdiClose: mdiClose
  }),

  methods:{
    cancel(){
      this.$store.commit('updateCancelDialog', true);
    }
  },
}
</script>