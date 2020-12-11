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

          <div
              class="text-body-2"
              v-if="noMyDiscoveries === true"
              style="margin: 16px"
          >
            You don't have any discoveries yet! Be sure to go out in nature and make some snaps of nice plants!
          </div>

          <v-container
              style="max-width: 1000px;"
              v-if="updateMyDiscoveries.length === 0 && this.noMyDiscoveries === false"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="n in 12"
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

          <div
              class="text-body-2"
              v-if="noTaggedDiscoveries === true"
              style="margin: 16px"
          >
            None of your friends have tagged you yet :( Be sure to go out and explore with your friends
          </div>

          <v-container
              style="max-width: 1000px;"
              v-if="updateTaggedDiscoveries.length === 0 && noTaggedDiscoveries === false"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="n in 12"
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
          <div class="badgesContainer tab_item_container" :style="{'grid-template-columns': badgesPerRow}">
            <!-- <Badge title="badges[j-1].title"/> -->
            <Badge title="Made 10 Discoveries"/>
            <Badge title="Scanned a wild animal"/>
            <Badge title="Scanned 10 Oak Trees"/>
            <Badge title="Made 10 Discoveries"/>
            <Badge title="Scanned a wild animal"/>
            <Badge title="Scanned 10 Oak Trees"/>
          </div>
        </v-tab-item>
      </v-tabs-items>

    </div>
  </v-container>
</template>

<script>
import Badge from "@/components/Badge";
import Avatar from "@/components/avatar";
import axios from "axios";

export default {
  name: "profileContent",

  components:{
    Badge,
    Avatar
  },

  data: () => ({
    tags: null,
    badges: null,
    tab: null,
    myDiscoveries: [],
    noMyDiscoveries: false,
    taggedDiscoveries: [],
    noTaggedDiscoveries: false,
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
    axios.get('/public/profile/getuserdiscoveries', {params: {data: this.$route.params.id}}).then(response => {
      if (response["data"].length !== 0){
        this.updateMyDiscoveries = response["data"];
      } else {
        this.noMyDiscoveries = true;
      }
    })

    //get tagged discoveries
    axios.get('/public/profile/gettaggeddiscoveries').then(response => {
      if (response["data"].length !== 0){
        this.updateTaggedDiscoveries = response["data"];
      } else {
        this.noTaggedDiscoveries = true;
      }
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

        this.$store.dispatch('fetchUserDataById', formData);
      }
    },
    goToPost(discovery){
      this.$router.push({path: `/post/${discovery.discoveryId}`})
    }
  },
}
</script>

<style scoped>

.badgesContainer {
  display: grid;
  /* grid-template-columns: auto auto;  */
}

.tab_item_container{
  margin-top: 12px;
}
</style>