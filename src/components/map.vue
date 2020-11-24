<template>
  <div>
    <div id="Discovery_map">
      <GmapMap
          :center=getMapCenter
          :zoom="12"
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
      </GmapMap>
    </div>

    <div id="Search_box">
      <div id="Back_button">
        <router-view name="backButton"></router-view>
      </div>
      <v-text-field
          label="Search discoveries"
          solo
          rounded
          clearable
          color="var(--dark-color)"
          v-model="updateSearchField"
          @click:clear="clearSearchResults"
          @keyup.enter="searchEnter"
      ></v-text-field>
    </div>


    <div class="chip_group_container" v-if="showBtns">
      <v-chip-group id="Buttons">
        <v-chip @click="getMyDiscoveries" color="var(--light-color)" text-color="white">Mine</v-chip>
        <v-chip @click="getFriendsDiscoveries" color="var(--light-color)" text-color="white">Friends</v-chip>
        <v-chip @click="getPopularDiscoveries" color="var(--light-color)" text-color="white">Popular</v-chip>
      </v-chip-group>
    </div>

    <div class="searchResult">
      <v-list-item-group class="searches" v-for="disco in getSearchResults" :key="disco">
        <div class="pictureBox">
          <v-avatar
              size="52"
              color="var(--dark-color)"
          >
            <span v-if="disco.PhotoPath === null"
                  class="white--text headline">{{ disco.userName.split(" ").map((n) => n[0]).join("") }}</span>
            <v-img v-else :src="disco.PhotoPath"></v-img>
          </v-avatar>
        </div>
        <div class="infoBox">
          <v-list-item
            @click="getDiscoInfo(disco);getPhotos(disco.discoveryId); clearSearchResults"
          >
            <v-list-item-content>
              <v-list-item-title> {{ disco.userName }}</v-list-item-title>
              <v-list-item-subtitle> {{ disco.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </div>


    <router-link to="/">
      <v-bottom-sheet
          id="Disco_info"
          v-model="updateMarkerDiscoveryOverlay"
          inset>
        <v-sheet
            class="mx-auto"
            elevation="8"
            max-width="100vw"
        >
          <v-skeleton-loader
              class="mx-auto"
              height="100px"
              type="image"
              v-if="photos===null"
          ></v-skeleton-loader>
          <v-slide-group
              v-if="updateMarkerDiscoveryOverlay"
          >
            <v-slide-item
                v-for="image in photos"
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
    </router-link>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import axios from "axios";

export default {
  name: "map",

  data() {
    return {
      photos: null,
      showBtns: true,
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
        this.photos = null
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
  },

  methods: {
    clearSearchResults: function () {
      this.$store.commit("updateSearchResults", null)
      this.showBtns = true;
    },
    getDiscoInfo(disco) {
      this.$store.commit("updateSelectedMarker", disco);
      this.$store.commit("updateMarkerDiscoveryOverlay", true);
    },
    getMyDiscoveries() {
      this.$store.dispatch('discoveriesMe');
    },
    getFriendsDiscoveries() {
      this.$store.dispatch('discoveriesFriends');
    },
    getPopularDiscoveries() {
      this.$store.dispatch('discoveriesPopular');
    },
    searchEnter() {
      this.$store.dispatch('searchDiscoveries');
      this.showBtns = false;
    },
    getPhotos(discoId) {
      axios.get('/public/mapcontroller/getDiscoveryPhotos', {params: {data: discoId}}).then(response => {
        this.photos = response["data"];
      });
    }
  }
};
</script>

<style>
.custom_pin {
  max-height: 40px;
  width: auto;
}

.pictureBox {
  padding: 5px 5px 5px 5px;
}

.infoBox {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.searches {
  display: flex;
  flex-direction: row;
  width: 350px;
  max-width: 100vw;
  margin: auto;
  background-color: white;
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
}

#Back_button {
  margin-top: 6px;
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

.searchResult {
  margin-top: -25px;
  background-color: white;
  height: 85vh;
  overflow-y: scroll;
  elevation: below;
}
</style>