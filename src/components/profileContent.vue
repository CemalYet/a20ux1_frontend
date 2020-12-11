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
          <v-list-item-title>{{ getUserData[0].userName }}</v-list-item-title>
          <v-list-item-subtitle>{{ getUserData[0].emailAddress }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <p> {{ getUserData[0] }} </p>

      <v-tabs
          v-model="tab"
          background-color="transparent"
          fixed-tabs
          color=var(--dark-color)>
        <v-tab href="#pictures">
          My pictures
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

        <v-tab-item value="tags">

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
                          color=var(--main-color)
                          height="15"
                      >
                        <strong>  {{ Math.ceil(calculatePoints(badge)) }}%</strong>
                      </v-progress-linear>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color=var(--main-color)
                            text
                            @click="badge.show = false"
                        >
                          Close
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

export default {
  name: "profileContent",

  components: {
    leafB,
    Avatar
  },

  data: () => ({
    tags: null,
    badges: null,
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
    leafPosition() {
      let leafPosition = (window.innerWidth /50) + 188 + 'px'
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
    updateMyDiscoveries: {
      get() {
        return this.myDiscoveries;
      },
      set(value) {
        this.myDiscoveries = value;
      }
    },
    updateTaggedDiscoveries: {
      get() {
        return this.taggedDiscoveries;
      },
      set(value){
        this.taggedDiscoveries = value;
      }
    },
      tab: {
        set (tab) {
          this.$router.replace({ query: { ...this.$route.query, tab } })
        },
        get () {
          return this.$route.query.tab
        }
      }
  },
  /*
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
*/
  mounted() {
    this.postUserId();

    //this.$store.dispatch('fetchUserDataById', this.$route.params.id);

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
    //get badges
    axios.get('/public/BadgeController/showALLBadges').then(response => {
      this.badges = response["data"];
      console.log(this.badges)
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
    },
    calculatePoints(badge){
      if(badge.currentPoints >= badge.reqPoints){
        return 100
      }else {
        return (((badge.reqPoints - badge.currentPoints) - badge.reqPoints) / badge.reqPoints) * (-100)
      }
    }
    /*
    myEventHandler() {
      window.location.reload(false);
    }
     */
  },
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
  background: url(../assets/tree.png) center repeat-y,
  url(./leaves.png) repeat;
  background-size: 140px, auto;
  margin: 0;
  padding: 0;
}
</style>