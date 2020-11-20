<template>
  <v-app-bar
      fixed
      color="white"
      elevation="1"
  >

    <!--left button menu-->
    <router-view name="buttonLeft"></router-view>

    <!-- Page title -->
    <v-spacer></v-spacer>
    <div class="userInfoBox">
      <div class="avatarBox">
        <!-- NOT IMPLEMENTED YET: showing the avatar based on who is logged in, is a default user right now -->
        <v-avatar size="52"><v-img :src="getDiscovery.avatar"></v-img></v-avatar>
      </div>
      <div class="infoBox">
        <v-list-item two-line>
          <v-list-item-content>
            <!-- NOT IMPLEMENTED YET: it's a default user and default discovery right now -->
            <v-list-item-title> {{ getDiscovery.userName }} </v-list-item-title>
            <v-list-item-subtitle> {{ getDiscovery.takenDate }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <v-spacer></v-spacer>

    <!--Profile icon-->
    <router-view name="buttonRight"></router-view>

  </v-app-bar>
</template>

<script>
export default {
  name: "appBarPost",

  computed:{
    getUserData(){
      return this.$store.getters.getUserData;
    },
    getDiscovery(){
      return this.$store.getters.getDiscoveryBasedOnId(this.$route.params.discovery_id);
    },
  },
}
</script>

<style scoped>
.userInfoBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 250px;
}

.avatarBox {
  padding: 5px 5px 5px 5px;
}

.infoBox {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>