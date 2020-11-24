<template>
  <div>
    <div id="Discovery_map">
      <!--Google Maps map with custom markers-->
      <GmapMap
          :center=getMapCenter
          :zoom=12
          style="width:100vw; height:100vh;"
          :options="mapOptions"
      >
        <gmap-custom-marker
            v-for="m in getMarkers"
            :key="m"
            :marker="{lat: m.Latitude, lng: m.Longitude}"
            @click.native="getDiscoInfo(m); getPhotos(m.discoveryId)"
        >
          <img class="custom_pin" src="../assets/pin.png" alt=""/>
        </gmap-custom-marker>
        <gmap-custom-marker
            v-if="searchResultMarker != null"
            :marker="{lat: searchResultMarker.Latitude, lng: searchResultMarker.Longitude}"
            @click.native="getDiscoInfo(searchResultMarker); getPhotos(searchResultMarker.discoveryId)"
        >
          <img class="custom_pin" src="../assets/pin.png" alt=""/>
        </gmap-custom-marker>
      </GmapMap>
    </div>

    <div id="Search_box">
      <v-menu offset-y>
        <template #activator="scope">
        <v-text-field
              label="Search discoveries"
              solo
              rounded
              clearable
              prepend-inner-icon = 'mdi-arrow-left'
              @click:prepend-inner="goBack"
              color="var(--dark-color)"
              v-model="updateSearchField"
              @click:clear="clearSearchResults"
              @keyup.enter="searchEnter(); scope.value=true"
        ></v-text-field>
        </template>
        <v-list
            v-for="disco in getSearchResults"
            :key="disco"
        >
          <v-list-item
              @click="selectSearch(disco)"
          >
            <v-list-item-avatar
                size="52"
                color="var(--dark-color)">
              <span v-if="disco.PhotoPath === null"
                    class="white--text headline">{{ disco.userName.split(" ").map((n) => n[0]).join("") }}</span>
              <v-img v-else :src="disco.PhotoPath"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title> {{ disco.userName }}</v-list-item-title>
              <v-list-item-subtitle> {{ disco.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>


    <div class="chip_group_container" v-if="showBtns">
      <v-chip-group id="Buttons">
        <v-chip @click="getMyDiscoveries" color="var(--light-color)" text-color="white">Mine</v-chip>
        <v-chip @click="getFriendsDiscoveries" color="var(--light-color)" text-color="white">Friends</v-chip>
        <v-chip @click="getPopularDiscoveries" color="var(--light-color)" text-color="white">Popular</v-chip>
      </v-chip-group>
    </div>

    <v-bottom-sheet
        id="Disco_info"
        v-model="updateMarkerDiscoveryOverlay"
        inset
        max-width="750px"
        @click="goToPost(getSelectedMarker.discoveryId)">
      <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="100vw"
      >
        <v-skeleton-loader
            class="mx-auto"
            height="100px"
            type="image"
            v-if="getDiscoveryPhotos===null"
        ></v-skeleton-loader>
        <v-slide-group
            v-if="updateMarkerDiscoveryOverlay"
        >
          <v-slide-item
              v-for="image in getDiscoveryPhotos"
              :key="image"
          >
            <img
                class="images"
                :src="image.PhotoPath"
                alt=""
            >
          </v-slide-item>
        </v-slide-group>
        <div id="images_text"
             v-if="updateMarkerDiscoveryOverlay">
          <h3>{{ getSelectedMarker.title }}</h3>
          <h5>{{ getSelectedMarker.userName }} - {{ getSelectedMarker.takenDate.slice(0, 10) }}</h5>
          <h5>{{ getSelectedMarker.location }}</h5>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: "map",

  data() {
    return {
      showBtns: true,
      searchResultMarker: null,
      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },

  components: {
    'gmap-custom-marker': GmapCustomMarker
  },

  mounted() {
    this.$store.dispatch('MapCenter');
    this.$store.dispatch('discoveriesMe');
  },

  computed: {
    getMapCenter() {
      return this.$store.getters.getMapCenter;
    },
    getMarkers() {
      return this.$store.getters.getMapMarkers;
    },
    getSelectedMarker: {
      get() {
        return this.$store.getters.getSelectedMarker;
      },
      set(value) {
        this.$store.commit("updateSelectedMarker", value)
      }
    },
    updateMarkerDiscoveryOverlay: {
      get() {
        return this.$store.getters.getMarkerDiscoveryOverlay;
      },
      set(value) {
        this.$store.commit("updateMarkerDiscoveryOverlay", value)
        this.$store.commit("updateDiscoveryPhotos", null)
      },
    },
    updateSearchField: {
      get() {
        return this.$store.getters.getSearchField;
      },
      set(value) {
        this.$store.commit("updateSearchField", value)
      }
    },
    getSearchResults() {
      return this.$store.getters.getSearchResults;
    },
    getDiscoveryPhotos() {
        return this.$store.getters.getDiscoveryPhotos;
    },
  },

  methods: {
    selectSearch(search){
      this.getDiscoInfo(search)
      this.getPhotos(search.discoveryId)
      this.clearSearchResults()
      this.searchResultMarker = search
      this.$store.commit("updateMapMarkers", null)
    },
    clearSearchResults () {
      this.$store.commit("updateSearchResults", null)
      this.showBtns = true;
      this.searchResultMarker = null;
    },
    getDiscoInfo(disco) {
      this.$store.commit("updateSelectedMarker", disco);
      this.$store.commit("updateDiscoCenter", disco);
      this.$store.commit("updateMarkerDiscoveryOverlay", true);
    },
    getMyDiscoveries() {
      this.$store.dispatch('discoveriesMe');
      this.searchResultMarker = null;
    },
    getFriendsDiscoveries() {
      this.$store.dispatch('discoveriesFriends');
      this.searchResultMarker = null;
    },
    getPopularDiscoveries() {
      this.$store.dispatch('discoveriesPopular');
      this.searchResultMarker = null;
    },
    searchEnter() {
      this.$store.dispatch('searchDiscoveries');
      this.showBtns = false;
    },
    getPhotos(value) {
      this.updateDiscoveryId(value);
      this.$store.dispatch('getPictures');
    },
    updateDiscoveryId(value) {
      this.$store.commit("updateDiscoveryId", value)
    },
    goToPost(discoId){
      this.$router.push({path: `/post/${discoId}`});
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
};
</script>

<style>
.custom_pin {
  max-height: 40px;
  width: auto;
}

#Discovery_map {
  position: absolute;
}

#Search_box {
  position: relative;
  display: flex;
  flex-direction: row;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  max-width: 750px;
  margin: auto;
}

#Buttons {
  margin-top: -25px;
}

.images {
  padding-right: 4px;
  height: 100px;
}

#images_text {
  padding: 0 10px 6px;
}

.chip_group_container {
  width: 225px;
  margin: auto;
}

</style>