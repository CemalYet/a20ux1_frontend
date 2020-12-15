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
      </GmapMap>
    </div>

    <!-- top search box -->
    <div id="Search_box">
      <v-menu offset-y max-height="80vh">
        <template #activator="scope" style="margin-bottom: 6px">
          <v-text-field
              hide-details
              label="Search discoveries"
              solo
              clearable
              prepend-inner-icon='mdi-arrow-left'
              color="var(--dark-color)"
              v-model="updateSearchField"
              @click:prepend-inner="goBack"
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
              <avatar :size="52" :user-name="disco.userName" :picture="disco.PhotoPath"></avatar>
            <v-list-item-content>
              <v-list-item-title> {{ disco.userName }}</v-list-item-title>
              <v-list-item-subtitle> {{ disco.title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- top buttons -->
    <div class="chip_group_container">
      <v-chip-group mandatory>
        <v-chip @click="getMyDiscoveries" color="var(--light-color)" text-color="white" label>Mine</v-chip>
        <v-chip @click="getFriendsDiscoveries" color="var(--light-color)" text-color="white" label>Friends</v-chip>
        <v-chip @click="getPopularDiscoveries" color="var(--light-color)" text-color="white" label>Popular</v-chip>
      </v-chip-group>
    </div>

    <!-- discovery info, when marker is selected-->
    <v-bottom-sheet
        id="Disco_info"
        v-model="updateMarkerDiscoveryOverlay"
        inset
        max-width="500px"
    >
      <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="100vw"
      >
        <!-- placeholder for images + load animation-->
        <div v-if="getDiscoveryPhotos===null">
          <v-skeleton-loader
              class="mx-auto"
              height="160px"
              type="image"
              id="sheet"
          >
          </v-skeleton-loader>
          <v-progress-linear
              color="var(--main-color)"
              indeterminate
              id="loader"
          ></v-progress-linear>
        </div>
        <v-slide-group
            v-if="updateMarkerDiscoveryOverlay"
        >
          <v-slide-item
              v-for="image in getDiscoveryPhotos"
              :key="image"
          >
            <v-img
                class="images"
                :src="image.PhotoPath"
                width="250px"
            >
            </v-img>
          </v-slide-item>
        </v-slide-group>
        <div
            id="images_text"
            v-if="updateMarkerDiscoveryOverlay"
        >
          <div id="info_text" @click="goToPost(getSelectedMarker.discoveryId)">
            <h3>{{ getSelectedMarker.title }}</h3>
            <h5>{{ getSelectedMarker.userName }} - {{ getSelectedMarker.takenDate.slice(0, 10) }}</h5>
            <h5>{{ getSelectedMarker.location }}</h5>
          </div>
          <div id="route_button">
            <v-btn
                color="var(--main-color)"
                dark
                @click="openGoogleMap(getSelectedMarker)"
            >
              <v-icon
              left>
                mdi-map-marker-radius-outline
              </v-icon>
              route
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import avatar from "@/components/avatar";

export default {
  name: "map",

  data() {
    return {
      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },

  metaInfo() {
    return {
      title: "Google Maps Verify",
      meta: [
        {
          name: "google-site-verification",
          content:"xULstTpcIKRJ3vI6qaH7l8PIhDTlWZN4l55SYOlbADA",
        }
      ]
    }
  },

  components: {
    'gmap-custom-marker': GmapCustomMarker,
    avatar
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
    getPinColor() {
      return this.$store.getters.getTheme;
    },
    selectSearch(search) {
      this.getDiscoInfo(search)
      this.getPhotos(search.discoveryId)
      this.$store.commit("updateSearchResults", null)
    },
    clearSearchResults() {
      this.$store.commit("updateSearchResults", null)
      this.$store.commit("updateMapMarkers", null)
    },
    getDiscoInfo(disco) {
      this.$store.commit("updateSelectedMarker", disco);
      this.$store.commit("updateDiscoCenter", disco);
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
    },
    getPhotos(value) {
      this.updateDiscoveryId(value);
      this.$store.dispatch('getPictures');
    },
    updateDiscoveryId(value) {
      this.$store.commit("updateDiscoveryId", value)
    },
    goToPost(discoId) {
      this.$router.push({path: '/post/' + discoId});
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    openGoogleMap(item) {
      let origin;
      let destination;
      navigator.geolocation.getCurrentPosition(
          position => {
            origin = position.coords.latitude + "," + position.coords.longitude;
            destination = item["Latitude"] + "," + item["Longitude"];
            window.open(
                "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination, "_blank"
            );
          },
      )
    },
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

.images {
  width: 220px;
  height: 160px;
  object-fit: cover;
}

#images_text {
  padding: 2px 10px 6px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
}

#info_text {
  grid-area: 1 / 1 / 4 / 2;
}

#route_button {
  grid-area: 1 / 2 / 4 / 3;
  margin: auto;
}

.chip_group_container {
  width: 225px;
  margin: auto;
}

#sheet {
  display: flex;
}

#loader {
  display: block;
  margin: auto;
}

</style>