<template>
  <v-app-bar-nav-icon @click.stop="goBack">
    <v-icon large color=var(--dark-color)>mdi-arrow-left</v-icon>
  </v-app-bar-nav-icon>
</template>

<script>
export default {
  name: "backButton",

  methods:{
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>