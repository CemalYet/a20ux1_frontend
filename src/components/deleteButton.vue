<template>
  <v-btn
      icon
      @click.native="deletePost">
    <v-icon large color=var(--dark-color)>mdi-trash-can-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "deleteButton",

  methods: {
    deletePost() {
      this.$store.dispatch('deleteDiscovery', this.$route.params.discovery_id);
      //Forward to feed
      this.$router.push({path: '/'});
    }
  }
}
</script>

<style scoped>

</style>