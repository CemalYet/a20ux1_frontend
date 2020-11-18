<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1"
    >

      <!--Back button-->
      <v-app-bar-nav-icon @click="feed()">
        <i class="fa fa-arrow-left fa-2x" style="color:#000000;" aria-hidden="true"></i>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <!-- Log out Button -->
      <div class="log_out_btn">
        <v-btn
          rounded
          color="white"
          @click="logOut()"
        >
          Log Out
        </v-btn>
      </div>

      <!--Edit button-->
      <div class="user_edit_icon">
        <v-btn icon @click="settings()">
          <icon name="user_edit" />
        </v-btn>
      </div>
    </v-app-bar>
    
    <!--Page-->
    <v-main id="main">
      <v-container>
        <div class="content">
          <!--User Info-->
          <div class="w-full p-10 user_container">
              <div class="avatar_container">
                <v-avatar
                    class="elevation-8"
                    size="152"
                >
                  <img :src="userData.avatar" alt="">
                </v-avatar>
              </div>
              <div class="user_info">
              <p class="user_info_header">{{ userData.userName }}</p>
              <p class="user_info_subheader">@{{ userData.userName.replace(/\s/g, '') }}</p>
              </div>
          </div>

          <v-container id="profile_content">
            <!--Navigation menu at the top-->
            <spam class="topMenu">
              <button class="topMenuButton" @click="tab = 'my_pictures'" :class="[tab == 'my_pictures' ? 'pressed':'unpressed']" :ripple="false">
                My pictures
              </button>
              <button class="topMenuButton" @click="tab = 'tags'" :class="[tab == 'tags' ? 'pressed':'unpressed']" :ripple="false">
                Tags
              </button>
              <button class="topMenuButton" @click="tab = 'badges'" :class="[tab == 'badges' ? 'pressed':'unpressed']" :ripple="false">
                Badges
              </button>
            </spam>

            <!--My Pictures tab-->
            <div v-if="tab == 'my_pictures'">
              <div class="photo_grid" :style="{'grid-template-columns': itemsPerRow}">
                <div class="photo_container" v-for="j in discoveries.length" :key="j">
                  <img class="photo" :src="discoveries[j-1].photoPath" alt="">
                </div>
                <div class="photo_container">
                  <img class="photo" src="https://www.differencebetween.com/wp-content/uploads/2019/11/Difference-Between-Stem-Tendril-and-Leaf-Tendril_2.jpg" alt="">
                </div>
                <div class="photo_container">
                  <img class="photo" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Sassafras_Leaves_June_Nbg_%28261691941%29.jpeg" alt="">
                </div> 
                <div class="photo_container">
                  <img class="photo" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Bloodroot_%28Sanguinaria_canadensis%29.jpeg" alt="">
                </div> 
              </div>
            </div>
            
            <!--Tags tab-->
            <div v-if="tab == 'tags'">
              <div class="photo_grid" :style="{'grid-template-columns': itemsPerRow}">
                <div class="photo_container">
                  <img class="photo" src="https://www.differencebetween.com/wp-content/uploads/2019/11/Difference-Between-Stem-Tendril-and-Leaf-Tendril_2.jpg" alt="">
                </div>
                <div class="photo_container" v-for="j in discoveries.length" :key="j">
                  <img class="photo" :src="discoveries[j-1].photoPath" alt="">
                </div>
                <div class="photo_container">
                  <img class="photo" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Bloodroot_%28Sanguinaria_canadensis%29.jpeg" alt="">
                </div> 
                <!-- <div class="photo_container" v-for="j in tags.length" :key="j">
                  <img class="photo" :src="tags[j-1].photoPath" alt="">
                </div> -->
              </div>
            </div>

            <!--Badges Tab-->
            <div v-if="tab == 'badges'">
              <!-- <div class="badgeContainer" v-for="j in badges.length" :key="j"> -->
              <div class="badgesContainer" :style="{'grid-template-columns': badgesPerRow}">
                <!-- <Badge title="badges[j-1].title"/> -->
                <Badge title="Made 10 Discoveries"/>
                <Badge title="Scanned a wild animal"/>
                <Badge title="Scanned 10 Oak Trees"/>
                <Badge title="Made 10 Discoveries"/>
                <Badge title="Scanned a wild animal"/>
                <Badge title="Scanned 10 Oak Trees"/>
              </div>
            </div>
          </v-container>

          </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Icon from '../../components/Icon';
import Badge from '../../components/Badge';
import axios from 'axios'
export default {
  name: 'App',

  components: {
    Icon,
    Badge
  },

  data: () => ({
    discoveries: null,
    userData: null,
    tags: null,
    badges: null,
    tab: 'my_pictures',
    test: null
  }),

  mounted() {
    axios.get('/public/profile/getOwnDiscoveries').then(response => (this.discoveries = response["data"]))
    axios.get('/public/profile/getUserData').then(response => (this.userData = response["data"]))
    // axios.get('/public/profile/getTags').then(response => (this.tags = response["data"]))
    // axios.get('/public/profile/getBadges').then(response => (this.badges = response["data"]))
  },

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
    }
  },

  methods: {
    logOut() {
      window.location.href = '/public/login/logout';
    },
    settings() {
      window.location.href = '/public/profile/settings';
    },
    feed() {
      window.location.href = '/public/feedcontroller/feed';
    }
  }
};
</script>

<style>
@import '../styles.css';
#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.topMenu{
  display: flex;
  padding: 0px;
  width: 100%;
  margin-bottom: 3rem;
  border: 2px solid black;
  text-align: center;
  font-family: 'Lato', sans-serif;
  line-height: 3rem;
  font-size: 18px;
}

.topMenuButton, .unpressed{
  flex-grow: 1;
  width: 100%;
  background-color: white;
}

.topMenuButton:focus, .pressed{
  flex-grow: 1;
  width: 100%;
  background-color: #00251A;
  color: white;
}

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

.user_container {
  margin-top: 3.5rem;
}

.user_info, .log_out_btn {
  display: inline-block;
  line-height: 6pt;
  top: 80%;
  font-family: 'Lato', sans-serif;
}

.user_info_header{
  font-size: 30px;
  font-weight: 700;
}

.user_info_subheader{
  font-size: 20px;
  font-weight: 300;
}

.avatar_container {
  display: inline-block;
  margin: 1.5rem;
}

.log_out_btn{
  color: black;
  margin-right: 0.5rem;
}

</style>