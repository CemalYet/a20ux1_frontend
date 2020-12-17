<template>
  <v-btn
      icon
      @click.stop="openDialog"
      v-if="this.$route.params.discovery_id === this.$store.getters.getLoggedInUserData[0].userId"
  >
    <v-icon large color=var(--dark-color)>mdi-trash-can-outline</v-icon>
  </v-btn>


</template>

<script>
export default {
  name: "deleteButton",

  methods: {
    openDialog() {
      this.$store.commit('updateDeleteDialog', true);
    }
  }

}
</script>

<style scoped>

</style>