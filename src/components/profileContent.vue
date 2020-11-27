<template>
  <v-container>

    <br>
    <div class="content">

      <!--User Info-->
      <!-- <userAvatarPlusInfo :style="{width:avatarWidth}" style="margin: auto;" ></userAvatarPlusInfo> -->
      <v-list-item two-line>
        <v-list-item-avatar size="70">
          <v-img :src="getData.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{getData.userName}}</v-list-item-title>
          <v-list-item-subtitle>{{getData.emailAddress}}</v-list-item-subtitle>
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
            <div class="photo_container" v-for="j in $store.getters.getDiscoveries.length" :key="j">
              <img class="photo" :src="$store.getters.getDiscoveries[j-1].photoPath" alt="">
            </div>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="photo_grid tab_item_container" :style="{'grid-template-columns': itemsPerRow}">
            <div class="photo_container" v-for="j in $store.getters.getDiscoveries.length" :key="j">
              <img class="photo" :src="$store.getters.getDiscoveries[j-1].photoPath" alt="">
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
// import userAvatarPlusInfo from "@/components/userAvatarPlusInfo";

export default {
  name: "profileContent",

  components:{
    Badge,
    // userAvatarPlusInfo
  },

  data: () => ({
    tags: null,
    badges: null,
    tab: null,
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
    getData(){
      return this.$store.getters.getFetchedUserData;
    }
  },

  created(){
    this.postUserId();
    this.$store.dispatch('fetchCurrentUserData') 
  },

  methods: {
    postUserId(){
      const userId = JSON.stringify({
      userId: this.$route.params.id
      });

      let formData = new FormData()
      formData.append('data', userId)

      this.$store.dispatch('fetchUserDataById', formData)
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
  border: 1px solid black;
}

.badgesContainer {
  display: grid;
  /* grid-template-columns: auto auto;  */
}

.tab_item_container{
  margin-top: 12px;
}
</style>