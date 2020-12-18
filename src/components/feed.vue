<template>
  <v-container>
    <br>
    <loader v-if="discoveriesData.length === 0 && feedDataLoading"></loader>
    <div v-if="discoveriesData.length === 0 && !feedDataLoading" style="text-align: center">
      <div class="text-h4">Your friends discoveries will show up here</div>
      <div class="text-subtitle-1">Go make some friends so you can enjoy there discoveries!</div>
    </div>
    <div class="leaf_grid"
         v-if="discoveriesData.length !== 0"
         :style="{'grid-template-columns': itemsPerRow}"
    >
      <div class="discovery_container" v-for="j in discoveriesData.length" :key="j">
        <leaf1 class="leaf"
               v-if="discoveriesData[j-1].leafId === '1'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf2 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '2'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf3 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '3'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf4 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '4'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf5 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '5'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <v-list
            max-width="100%"
            class="info_container"
        >
          <v-list-item>
            <avatar :size="56" :picture="discoveriesData[j-1].avatar" :user-name="discoveriesData[j-1].userName"></avatar>
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;"> {{ discoveriesData[j - 1].title }} </v-list-item-title>
              <v-list-item-subtitle> {{ discoveriesData[j - 1].userName }} - {{ discoveriesData[j - 1].takenDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <br>
    <br>
  </v-container>
</template>

<script>
import leaf1 from "@/components/leaves/leaf1";
import leaf2 from "@/components/leaves/leaf2";
import leaf3 from "@/components/leaves/leaf3";
import leaf4 from "@/components/leaves/leaf4";
import leaf5 from "@/components/leaves/leaf5";
import avatar from "@/components/avatar";
import loader from "@/components/loader";

export default {
  name: "feed",

  components: {
    leaf1,
    leaf2,
    leaf3,
    leaf4,
    leaf5,
    avatar,
    loader
  },


  methods:{
    goToPost(discovery_id){
      console.log(discovery_id);
      this.$router.push({path: `/post/${discovery_id}`});
    }
  },

  computed: {
    discoveriesData(){
      return this.$store.getters.getDiscoveries;
    },

    feedDataLoading(){
      return this.$store.getters.feedDataLoading;
    },

    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "repeat(1, 400px)"
        case 'sm':
          return "repeat(2, 400px)"
        case 'md':
          return "repeat(2, 400px)"
        case 'lg':
          return "repeat(3, 400px)"
        case 'xl':
          return "repeat(3, 400px)"
      }
      return 1;
    },
  },

  mounted() {
    this.$store.dispatch('fetchFriendRequestNotifications')
    this.$store.dispatch('fetchFriendsDiscoveries')
  },

  beforeRouteLeave(to, from, next){
    this.$store.commit('updateDrawer', false);
    next();
  }

}
</script>

<style scoped>

.leaf_grid {
  display: grid;
  grid-template-rows: auto;

  place-items: center center;
  justify-content: center;
}


.discovery_container {
  position: relative;
  width: 90%;
  height: auto;
}

.info_container {
  position: absolute;
  top: 80%;
  background-color: rgba(255, 255, 255, 0.5);
}

.leaf {
  margin: 6px;
}

</style>