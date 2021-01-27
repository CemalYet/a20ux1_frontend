<template>
  <v-app-bar-nav-icon @click.stop="toggleDrawer">
    <v-icon large color=var(--dark-color)>{{ mdiMenu }}</v-icon>
    <v-badge
        color="red"
        :content="friendRequestNotifications"
        :value="friendRequestNotifications"
    >
    </v-badge>
  </v-app-bar-nav-icon>
</template>

<script>
import {mdiMenu} from '@mdi/js';
export default {
  name: "hamburgerButton",

  data:()=>({
    mdiMenu: mdiMenu
  }),

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