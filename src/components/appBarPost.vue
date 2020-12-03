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
        <avatar :size="52" :user-name="updateDiscoveryData[0].userName" :picture="updateDiscoveryData[0].avatar"
                @click.native="goToUser(updateDiscoveryData[0].userId)"></avatar>
      </div>
      <div class="infoBox">
        <v-list-item two-line>
          <v-list-item-content>
            <!-- NOT IMPLEMENTED YET: it's a default user and default discovery right now -->
            <v-list-item-title> {{ updateDiscoveryData[0].userName }} </v-list-item-title>
            <v-list-item-subtitle> {{ updateDiscoveryData[0].takenDate }} </v-list-item-subtitle>
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
import avatar from "@/components/avatar";

export default {
  name: "appBarPost",

  components: {
    avatar
  },

  computed:{
    updateDiscoveryData(){
      return this.$store.getters.getDiscoveryPostData;
    }
  },
  methods:{
    goToUser(user_id){
      if(typeof(user_id)!=='undefined'){
        this.$router.push({path: `/profile/${user_id}`})}
    }
  }
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