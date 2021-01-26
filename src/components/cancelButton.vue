<template>
  <v-app-bar-nav-icon @click.stop="cancel">
    <v-icon large color=var(--dark-color)>mdi-close</v-icon>
  </v-app-bar-nav-icon>
</template>

<script>
export default {
  name: "cancelButton",

  methods:{
    cancel(){
      this.$store.commit('updateCancelDialog', true);
    }
  },
}
</script>