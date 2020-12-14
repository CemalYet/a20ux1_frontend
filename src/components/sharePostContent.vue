<template>
  <div class="content" v-if="updateDiscoveryPostPhotos.length !== 0">
    <div class="middleContainer">
      <div class="center">
        <div class="img">
          <v-img :src="updateDiscoveryPostPhotos[0].PhotoPath"></v-img>
        </div>
        <div class="share">
          <p class="subtitle"> Share discovery </p>
          <v-divider color=var(--dark-color) ></v-divider>
          <!-- NOT IMPLEMENTED YET: actually sharing on social media, but I think it can be done with vue-social-sharing -->
          <div class="icons">
            <v-btn icon class="share_button">
              <v-icon large color=var(--dark-color)>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon class="share_button">
              <v-icon large color=var(--dark-color)>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon class="share_button">
              <v-icon large color=var(--dark-color)>mdi-twitter</v-icon>
            </v-btn>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sharePostContent",

  mounted() {
    this.$store.dispatch('fetchDiscoveryPostPhotosOnId', this.$route.params.discovery_id);
  },

  computed:{
    updateDiscoveryPostPhotos(){
      return this.$store.getters.getDiscoveryPostPhotos;
    },
  }
}
</script>

<style scoped>
.middleContainer {
  width: 100%;
  max-width: 750px;
  height: 100%;
  margin: auto;
}

.img {
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.center {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.subtitle {
  font-family: 'Merriweather', serif;
  font-size: 20px;
  color: var(--dark-color);
  text-align: center;
}

.icons {
  display: flex;
  justify-content: center;
  padding: 12px;
}

.share_button{
  margin-left: 3px;
  margin-right: 3px;
}

.share {
  padding-top: 20px;
}
</style>