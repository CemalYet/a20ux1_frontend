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
      </v-list>

      <template>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="goToWiki">
            <v-icon large color=var(--main-color) left>{{ mdiTreeOutline }}</v-icon>
            Wiki
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="goToFriends">
            <v-icon large color=var(--main-color) left>{{ mdiAccountPlusOutline }}</v-icon>
            <v-badge
                color="red"
                :content="friendRequestNotifications"
                :value="friendRequestNotifications"
                offset-x="20"
            ></v-badge>
            {{ $t('buttons.friends')}}
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="goToBadges">
            <v-icon large color=var(--main-color) left>{{ mdiMedalOutline }}</v-icon>
            Badges
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="goToMap">
            <v-icon large color=var(--main-color) left>{{ mdiMapOutline }}</v-icon>
            {{ $t('buttons.map')}}
          </v-btn>
        </div>
      </template>

      <!-- Settings&logout button-->

      <template v-slot:append>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="goToSettings">
            <v-icon large color=var(--main-color) left>{{ mdiCogOutline }}</v-icon>
            {{ $t('buttons.settings')}}
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn text :ripple="false" @click="logOut">
            <v-icon large color=var(--main-color) left>{{ mdiLogout }}</v-icon>
            {{ $t('buttons.logout')}}
          </v-btn>
        </div>
      </template>

  </v-navigation-drawer>
</template>

<script>
import userAvatarPlusInfo from "@/components/userAvatarPlusInfo";
import {mdiTreeOutline} from '@mdi/js';
import {mdiAccountPlusOutline} from '@mdi/js';
import {mdiMapOutline} from '@mdi/js';
import {mdiMedalOutline} from '@mdi/js';
import {mdiCogOutline} from '@mdi/js';
import {mdiLogout} from '@mdi/js';

export default {
  name: "navDrawer",
  data: () => ({
    userId:null,
    mdiTreeOutline: mdiTreeOutline,
    mdiAccountPlusOutline: mdiAccountPlusOutline,
    mdiMapOutline: mdiMapOutline,
    mdiMedalOutline: mdiMedalOutline,
    mdiCogOutline: mdiCogOutline,
    mdiLogout: mdiLogout
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