<template>
  <v-container>

    <br>
    <div class="content">

      <!--User Info-->
      <v-list-item
          two-line
      >
        <avatar :size="70" :user-name="getUserData[0].userName" :picture="getUserData[0].avatar"></avatar>
        <v-list-item-content>
          <v-list-item-title>{{getUserData[0].userName}}</v-list-item-title>
          <v-list-item-subtitle>{{getUserData[0].emailAddress}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-tabs
          v-model="tab"
          background-color="transparent"
          fixed-tabs
          color=var(--dark-color)>
        <v-tab>
          My pictures
        </v-tab>
        <v-tab>
          Tags
        </v-tab>
        <v-tab>
          Badges
        </v-tab>
      </v-tabs>

      <v-tabs-items
          v-model="tab">
        <v-tab-item>
          <v-container
              style="max-width: 1000px;"
              v-if="updateMyDiscoveries.length === 0"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="n in 18"
                  :key="n"
                  class="d-flex child-flex"
                  :cols="itemsPerRowGrid"
              >

                <v-img
                    aspect-ratio="1"
                    class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                      <v-skeleton-loader
                          class="mx-auto"
                          type="image"
                      ></v-skeleton-loader>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>

          <v-container
              style="max-width: 1000px;"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="discovery in updateMyDiscoveries"
                  :key="discovery"
                  class="d-flex child-flex"
                  :cols="itemsPerRowGrid"
              >

                  <v-img
                      :src="discovery.photoPath"
                      :lazy-src="discovery.photoPath"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      v-ripple
                      @click="goToPost(discovery)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                      >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>

          <v-container
              style="max-width: 1000px;"
              v-if="updateTaggedDiscoveries.length === 0"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="n in 18"
                  :key="n"
                  class="d-flex child-flex"
                  :cols="itemsPerRowGrid"
              >

                <v-img
                    aspect-ratio="1"
                    class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                      <v-skeleton-loader
                          class="mx-auto"
                          type="image"
                      ></v-skeleton-loader>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>

          <v-container
              style="max-width: 1000px;"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="discovery in updateTaggedDiscoveries"
                  :key="discovery"
                  class="d-flex child-flex"
                  :cols="itemsPerRowGrid"
              >
                <v-img
                    :src="discovery.photoPath"
                    :lazy-src="discovery.photoPath"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click="goToPost(discovery)"
                >
                  <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                      <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <div
              id="example1">
            <v-list class="list">
              <v-list-item
                  v-for="n in 45"
                  :key="n"
                  style="text-align: center"

              >
              <leafB style="width: 150px" v-if="n % 2 ===0 "/>
              <leafB  class="img-hor-vert" v-else-if=" n % 2 !== 0 "/>
              </v-list-item>
            </v-list>
          </div>
        </v-tab-item>
      </v-tabs-items>

    </div>
  </v-container>
</template>

<script>

import Avatar from "@/components/avatar";
import axios from "axios";
import leafB from "@/components/leaves/leafB";

export default {
  name: "profileContent",

  components:{
    leafB,
    Avatar
  },

  data: () => ({
    tags: null,
    badges: null,
    tab: null,
    myDiscoveries: [],
    taggedDiscoveries: [],
    images: [
      {
        img:"../assets/tree.png",
      },]

  }),

  computed: {

    itemsPerRowGrid() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "4"
        case 'sm':
          return "4"
        case 'md':
          return "4"
        case 'lg':
          return "3"
        case 'xl':
          return "3"
      }
      return "12";
    },
    badgesPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "auto"
        case 'sm':
          return "auto"
        case 'md':
          return "auto auto"
        case 'lg':
          return "auto auto"
        case 'xl':
          return "auto auto"
      }
      return 1;
    },

    getUserData(){
      if (this.$route.params.id !== this.$store.getters.getLoggedInUserData[0].userId) {
        return this.$store.getters.getFetchedUserData;
      } else{
        return this.$store.getters.getLoggedInUserData;
      }
    },
    updateMyDiscoveries:{
      get(){
        return this.myDiscoveries;
      },
      set(value) {
        this.myDiscoveries = value;
      }
    },
    updateTaggedDiscoveries:{
      get(){
        return this.taggedDiscoveries;
      },
      set(value){
        this.taggedDiscoveries = value;
      }
    },
  },

  mounted(){
    this.postUserId();

    // get my discoveries
    axios.get('/public/profile/getowndiscoveries').then(response => {
      this.updateMyDiscoveries = response["data"];
    })

    //get tagged discoveries
    axios.get('/public/profile/gettaggeddiscoveries').then(response => {
      this.updateTaggedDiscoveries = response["data"];
    })

  },

  methods: {
    postUserId(){
      if (this.$route.params.id !== this.$store.getters.getLoggedInUserData[0].user){
        const userId = JSON.stringify({
          userId: this.$route.params.id
        });

        let formData = new FormData()
        formData.append('data', userId)

        this.$store.dispatch('fetchUserDataById', formData)
      }
    },
    goToPost(discovery){
      this.$router.push({path: `/post/${discovery.discoveryId}`})
    }
  },
}
</script>

<style scoped>

.img-hor-vert {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 150px;
}

.list{
  background: transparent;
  text-align: center;
}
#example1 {
  background:
      url(../assets/tree.png) center repeat-y,
      url(./leaves.png) repeat;
  background-size: 140px, auto;
}
</style>