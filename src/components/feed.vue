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

        <div class="info_container">
          <div class="avatar_container">
            <v-avatar
                class="elevation-8"
                size="56"
            >
              <img :src="discoveriesData[j-1].avatar" alt="">
            </v-avatar>
          </div>
          <div class="discovery_text_container text-truncate">
            <h6 class="text-truncate">{{ discoveriesData[j - 1].takenDate }}</h6>
            <h4 class="text-truncate">{{ discoveriesData[j - 1].title }}</h4>
            <h6 class="text-truncate">{{ discoveriesData[j - 1].userName }}</h6>
          </div>
        </div>
      </div>
    </div>
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
  max-width: 400px;
  height: auto;
}

.info_container {
  position: absolute;
  top: 80%;
  background-color: rgba(255, 255, 255, 0.5);
}

.avatar_container {
  display: inline-block;
}

.discovery_text_container {
  display: inline-block;
  float: right;
  padding-left: 8px;
  height: auto;
  width: 250px;
  text-align: left;
}

.leaf {
  margin: 4px;
}

</style>