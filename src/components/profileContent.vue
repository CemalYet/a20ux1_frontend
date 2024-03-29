<template>
  <v-container style="padding-bottom: 0">

    <br>
    <div class="content">
      <!--User Info-->
      <v-list-item
          two-line
          v-if="getUserData.length !== 0"
      >
        <avatar :size="70" :user-name="getUserData[0].userName" :picture="getUserData[0].avatar"></avatar>
        <v-list-item-content>
          <v-list-item-title>{{ getUserData[0].userName }}</v-list-item-title>
          <v-list-item-subtitle>Observations: {{ updateProfileDiscoveries.length }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-tabs
          v-model="tab"
          background-color="transparent"
          fixed-tabs
          color=var(--dark-color)
          style="margin-top: 10px">
        <v-tab href="#pictures">
          {{ $t('prContent.tabPh') }}
        </v-tab>
        <v-tab href="#tags">
          Tags
        </v-tab>
        <v-tab href="#badges">
          Badges
        </v-tab>
      </v-tabs>

      <v-tabs-items
          :value="tab">
        <v-tab-item value="pictures">

          <loader v-if="updateProfileDiscoveries.length === 0 && updateProfileDiscoveriesLoading === true"></loader>

          <div
              class="text-body-2"
              v-if="updateProfileDiscoveries.length === 0 && updateProfileDiscoveriesLoading === false"
              style="margin: 16px"
          >
            {{ $t('prContent.messagePh') }}
          </div>

          <v-container
              style="max-width: 1000px;"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="discovery in updateProfileDiscoveries"
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

        <v-tab-item value="tags">

          <loader
              v-if="updateProfileTaggedDiscoveries.length === 0 && updateProfileTaggedDiscoveriesLoading === true"></loader>

          <div
              class="text-body-2"
              v-if="updateProfileTaggedDiscoveries.length === 0 && updateProfileTaggedDiscoveriesLoading === false"
              style="margin: 16px"
          >
            '{{ $t('prContent.messageTg') }}'
          </div>

          <v-container
              style="max-width: 1000px;"
          >
            <v-row
                align="start"
                dense
            >
              <v-col
                  v-for="discovery in updateProfileTaggedDiscoveries"
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

        <v-tab-item value="badges">
          <div
              id="example1">
            <v-list class="list">
              <v-list-item
                  v-for="badge in badges "
                  :key="badge"
                  class="listItem"
              >
                <v-list-item-action class="mr-0 ml-0">
                  <v-dialog
                      v-model="badge.show"
                      width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <div class="leaves" v-if="badge.badgeBasicId % 2 === 0"
                           :style="{'margin-right':leafPosition}"
                           v-bind="attrs"
                           v-on="on">
                        <leafB
                            :style="[parseInt(badge.completed) === 0 ? parseInt(badge.currentPoints) === 0 ? {'fill':'darkgray'} : {'fill':'chocolate'} : {'fill':'#39796B'}]"
                            class="evenStyle"
                            v-bind:text="badge.title"
                        >
                        </leafB>
                      </div>
                      <div class="leaves" v-bind="attrs"
                           :style="{'margin-left':leafPosition}"
                           v-on="on"
                           v-else-if="badge.badgeBasicId % 2 !== 0 ">
                        <leafB
                            :style="[parseInt(badge.completed) === 0 ? parseInt(badge.currentPoints) === 0 ? {'fill':'darkgray'} : {'fill':'chocolate'} : {'fill':'#39796B'}]"
                            class="img-hor-vert"
                            v-bind:text2="badge.title"
                        >
                        </leafB>
                      </div>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        {{ badge.title }}
                      </v-card-title>

                      <v-card-text>
                        {{ badge.description }}
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-progress-linear
                          :value="calculatePoints(badge)"
                          dark
                          color=var(--main-color)
                          height="30"
                      >
                        <strong> {{ Math.ceil(calculatePoints(badge)) }}%</strong>
                      </v-progress-linear>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color=var(--main-color)
                            text
                            @click="badge.show = false"
                        >
                          {{ $t('buttons.close') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-item-action>
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
import loader from "@/components/loader";
import store from "@/store";

export default {
  name: "profileContent",

  metaInfo:{
    title: "profile",
  },

  components: {
    leafB,
    Avatar,
    loader
  },

  data: () => ({
    badges: null,
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
    leafPosition() {
      let leafPosition = (window.innerWidth / 50) + 188 + 'px'
      console.log(leafPosition)
      return leafPosition
    },
    getUserData() {
      if (this.$route.params.id !== this.$store.getters.getLoggedInUserData[0].userId) {
        return this.$store.getters.getFetchedUserData;
      } else {
        return this.$store.getters.getLoggedInUserData;
      }
    },
    updateProfileDiscoveries() {
      return this.$store.getters.getProfileDiscoveries;
    },
    updateProfileDiscoveriesLoading() {
      return this.$store.getters.getProfileDiscoveriesLoading;
    },
    updateProfileTaggedDiscoveries() {
      return this.$store.getters.getProfileTaggedDiscoveries;
    },
    updateProfileTaggedDiscoveriesLoading() {
      return this.$store.getters.getProfileTaggedDiscoveriesLoading;
    },

    tab: {
      set(tab) {
        this.$router.replace({query: {...this.$route.query, tab}})
      },
      get() {
        return this.$route.query.tab
      }
    }
  },

  mounted() {

    //store a variable so that the page doesn't have to reload data all the time
    this.$store.commit('updatePrevProfileId', this.$route.params.id);

    if (this.$route.params.id !== this.$store.getters.getLoggedInUserData[0].userId) {
      this.$store.dispatch('fetchUserDataById', this.$route.params.id);
    }

    // get my discoveries
    this.$store.dispatch('fetchProfileDiscoveries', this.$route.params.id);

    //get tagged discoveries
    this.$store.dispatch('fetchProfileTaggedDiscoveries', this.$route.params.id);

    //get badges
    axios.get('/public/badgeController/showAllBadges', {params: {userId: store.getters.getLoggedInUserData[0].userId}}).then(response => {
      this.badges = response["data"];
    })
  },

  methods: {
    goToPost(discovery) {
      this.$router.push({path: `/post/${discovery.discoveryId}`})
    },
    calculatePoints(badge) {
      if (badge.currentPoints > badge.reqPoints) {
        return 100
      } else {
        return (badge.currentPoints / badge.reqPoints) * (100)
      }
    },

  },

  beforeRouteUpdate(to, from, next) {
    console.log('checking user id' + to.params.id + ' and ' + this.$store.getters.getPrevProfileId)
    if (to.params.id !== this.$store.getters.getPrevProfileId) {
      console.log('clearing data')
      this.$store.commit('resetProfileContent');
    }
    next();
  }
}
</script>

<style scoped>

.img-hor-vert {
  -moz-transform: rotate(150deg);
  -o-transform: rotate(150deg);
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
  width: 180px;
  padding: 0px;


}

.evenStyle {
  -webkit-transform: rotate(-30deg);
  -moz-transform: rotate(-30deg);
  -ms-transform: rotate(-30deg);
  -o-transform: rotate(-30deg);
  transform: rotate(-30deg);
  width: 180px;
  padding: 0px;
}

.listItem {
  justify-content: center;
  margin: 0;
  padding: 0;

}

.leaves {
  width: 200px;

}

.list {
  background: transparent;
  text-align: center;
}

#example1 {
  background-color: transparent;
  background-image: url(../assets/tree.png);
  background-repeat: repeat-y;
  background-position: center;
  background-size: 140px, auto;
  margin: 0;
  padding: 0;
}
</style>