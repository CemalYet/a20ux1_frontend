<template>
  <!--Navigation menu on the left side-->
  <v-navigation-drawer
      v-model="updateDrawer"
      fixed
      temporary
  >
    <v-list
        nav
        dense
    >
      <!--Avatar + name-->
      <v-list-item two-line>
        <v-list-item-avatar size="70">
          <v-img :src="userData[0].avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{userData[0].emailAddress}}</v-list-item-title>
          <v-list-item-subtitle>{{userData[0].userName}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!--Menu options-->
      <v-list-item link :ripple="false">
        <v-list-item-icon>
          <v-icon large color=var(--main-color)>mdi-tree-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>My Discoveries</v-list-item-title>
      </v-list-item>
      <v-list-item link :ripple="false">
        <v-list-item-icon>
          <v-icon large color=var(--main-color)>mdi-account-plus-outline</v-icon>
          <v-badge color="red" :content="this.$store.getters.getNotifications" overlap></v-badge>
        </v-list-item-icon>
        <v-list-item-title>Friends</v-list-item-title>
      </v-list-item>
      <v-list-item link :ripple="false">
        <v-list-item-icon>
          <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Badges</v-list-item-title>
      </v-list-item>
      <v-list-item link :ripple="false">
        <v-list-item-icon>
          <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Map</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Settings button-->
    <template v-slot:append>
      <div class="pa-2">
        <v-btn text :ripple="false">
          <v-icon large color=var(--main-color) left>mdi-cog-outline</v-icon>
          Settings
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "navDrawer",


  computed:{
    updateDrawer: {
      get() {
        return this.$store.getters.getDrawerState;
      },
      set(value) {
        this.$store.commit("updateDrawer", value)
      }
    },
    userData(){
      return this.$store.getters.getUserDate;
    }
  }
}
</script>

<style scoped>

</style>