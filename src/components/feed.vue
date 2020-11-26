<template>
  <v-container>
    <br>
    <div class="leaf_grid"
         :style="{'grid-template-columns': itemsPerRow}"
    >
      <div class="discovery_container" v-for="j in discoveriesData.length" :key="j">

        <leaf1 class="leaf"
               v-if="discoveriesData[j-1].leafId === '0'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf2 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '1'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf3 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '2'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf4 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '3'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>
        <leaf5 class="leaf"
               v-else-if="discoveriesData[j-1].leafId === '4'"
               v-bind:picture="discoveriesData[j-1].photoPath"
               @click.native="goToPost(discoveriesData[j-1].discoveryId)"/>

        <v-list

            max-width="100%"
            class="info_container"
        >
          <v-list-item>
            <v-list-item-avatar size="48">
              <v-img :src="discoveriesData[j-1].avatar" alt=""></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title style="white-space: normal;"> {{ discoveriesData[j - 1].title }} </v-list-item-title>
              <v-list-item-subtitle> {{ discoveriesData[j - 1].userName }} - {{ discoveriesData[j - 1].takenDate }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <br>
  </v-container>
</template>

<script>
import leaf1 from "@/components/leaves/leaf1";
import leaf2 from "@/components/leaves/leaf2";
import leaf3 from "@/components/leaves/leaf3";
import leaf4 from "@/components/leaves/leaf4";
import leaf5 from "@/components/leaves/leaf5";

export default {
  name: "feed",

  components: {
    leaf1,
    leaf2,
    leaf3,
    leaf4,
    leaf5,
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
    //this.$store.dispatch('fetchFriendRequestNotifications')
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