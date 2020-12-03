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
          <div class="photo_grid tab_item_container" :style="{'grid-template-columns': itemsPerRow}">
            <div class="photo_container"
                 v-for="discovery in updateMyDiscoveries"
                 :key="discovery">
              <img class="photo" :src="discovery.photoPath" alt="">
            </div>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="photo_grid tab_item_container" :style="{'grid-template-columns': itemsPerRow}">
            <div class="photo_container" v-for="discovery in updateTaggedDiscoveries" :key="discovery">
              <img class="photo" :src="discovery.photoPath" alt="">
            </div>
          </div>
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
    // userAvatarPlusInfo
  },

  data: () => ({
    tags: null,
    badges: null,
    tab: null,
    myDiscoveries: [],
    taggedDiscoveries: [],
  }),

  computed: {
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "auto"
        case 'sm':
          return "auto"
        case 'md':
          return "auto auto"
        case 'lg':
          return "auto auto auto"
        case 'xl':
          return "auto auto auto auto"
      }
      return 1;
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
    avatarWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "100%"
        case 'sm':
          return "100%"
        case 'md':
          return "50%"
        case 'lg':
          return "50%"
        case 'xl':
          return "50%"
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
    }
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
    }
  },
}
</script>

<style scoped>
.photo_grid {
  display: grid;
  /* grid-template-columns: auto auto auto; */
  text-align: center;
  align-content: stretch;
  /* margin: 2rem 3rem 1rem 3rem; */
  align-items: start;
  justify-content: center;
  /* border: 2px solid black; */
  gap: 3rem;
}

.photo_container {
  text-align: center;
  display: inline;
}

.photo{
  width: 20rem;
  height: 20rem;
  object-fit:cover;
  border: 1px solid var(--dark-color);
}

.badgesContainer {
  display: grid;
  /* grid-template-columns: auto auto;  */
}

.tab_item_container{
  margin-top: 12px;
}
</style>