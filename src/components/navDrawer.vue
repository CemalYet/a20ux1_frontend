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
        <userAvatarPlusInfo></userAvatarPlusInfo>

        <!--Menu options-->

          <v-list-item link :ripple="false" @click="goToWiki">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-tree-outline</v-icon>
            </v-list-item-icon>
            <h4>Wiki</h4>
          </v-list-item>
          <v-list-item link :ripple="false" @click="goToFriends">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-account-plus-outline</v-icon>
              <v-badge
                  color="red"
                  :content="friendRequestNotifications"
                  :value="friendRequestNotifications"
                  overlap
              ></v-badge>
            </v-list-item-icon>
            <h4>Friends</h4>
          </v-list-item>
          <v-list-item link :ripple="false"  @click.native="goToBadges">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
            </v-list-item-icon>
            <h4>Badges</h4>
          </v-list-item>
          <v-list-item link :ripple="false" @click.native="goToMap">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
            </v-list-item-icon>
            <h4>Map</h4>
          </v-list-item>


      </v-list>

      <!-- Settings&logout button-->

        <template v-slot:append>
          <div class="pa-2">
            <v-btn text :ripple="false" @click="goToSettings">
              <v-icon large color=var(--main-color) left>mdi-cog-outline</v-icon>
              Settings
            </v-btn>
          </div>
          <div class="pa-2">
            <v-btn text :ripple="false" @click="logOut">
              <v-icon large color=var(--main-color) left>mdi-logout</v-icon>
              Logout
            </v-btn>
          </div>
        </template>

  </v-navigation-drawer>
</template>

<script>
import userAvatarPlusInfo from "@/components/userAvatarPlusInfo";

export default {
  name: "navDrawer",
  data: () => ({
    userId:null
  }),

  components:{
    userAvatarPlusInfo
  },
  mounted() {
    this.userId=this.$store.getters.getLoggedInUserData[0].userId
  },
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
      return this.$store.getters.getLoggedInUserData;
    },
    friendRequestNotifications(){
      return this.$store.getters.getFriendRequestNotifications;
    },

  },

  methods:{
    goToWiki() {
      this.$router.push({path:'wiki'})
    },
    goToMap(){
      this.$router.push({path:'map'})
    },
    goToFriends(){
      this.$router.push({path: "friends"});
    },
    goToBadges(){
      if(typeof(this.userId)!=='undefined'){
        this.$router.push({path: `/profile/${this.userId}?tab=badges`})}
    },
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push({path: '/login'});
    },
    goToSettings(){
      this.$router.push({path: "settings"});
    },
  }
}
</script>

<style scoped>


</style>