<template>
  <v-app-bar-nav-icon @click.stop="toggleDrawer">
    <v-icon large color=var(--dark-color)>mdi-menu</v-icon>
    <v-badge
        color="red"
        :content="friendRequestNotifications"
        v-if="friendRequestNotifications !== 0"
    >

    </v-badge>
  </v-app-bar-nav-icon>
</template>

<script>
export default {
  name: "hamburgerButton",

  methods:{
    toggleDrawer(){
      this.$store.commit("toggleDrawer");
    }
  },

  computed:{
    friendRequestNotifications(){
      return this.$store.getters.getFriendRequestNotifications;
    },
  }
}
</script>

<style scoped>

</style>