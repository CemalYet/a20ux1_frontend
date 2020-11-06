<template>
  <v-app>
    <!--Bar at the top of the page-->
    <v-app-bar
        fixed
        color="white"
        elevation="1"
    >

      <!--Hamburger menu-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon large color=var(--dark-color)>mdi-menu</v-icon>
        <v-badge color="red" :content="notifications"></v-badge>
      </v-app-bar-nav-icon>

      <!-- Page title -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">snAPP</v-toolbar-title>
      <v-spacer></v-spacer>

      <!--Profile icon-->
      <v-btn icon>
        <v-icon large color=var(--dark-color)>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>
      <br/>

      <h1>{{data}}</h1>

      <br/>
      <br/>
      <br/>
      <!--Grid of Leaves-->
      <v-container>
        <div class="leaf_grid"
             :style="{'grid-template-columns': itemsPerRow}"
        >
          <div class="discovery_container" v-for="j in discoveries.length" :key="j">
            <h1>{{discoveries[j-1].photoPath}}</h1>
            <leaf1 class="leaf" v-if="discoveries[j-1].leafId === 0" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf2 class="leaf" v-if="discoveries[j-1].leafId === 1" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf3 class="leaf" v-if="discoveries[j-1].leafId === 2" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf4 class="leaf" v-if="discoveries[j-1].leafId === 3" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf5 class="leaf" v-if="discoveries[j-1].leafId === 4" v-bind:picture="discoveries[j-1].photoPath"/>

            <div class="info_container">
              <div class="avatar_container">
                <v-avatar
                    class="elevation-8"
                    size="56"
                >
                  <img :src="discoveries[j-1].avatar" alt="PF">
                </v-avatar>
              </div>
              <div class="discovery_text_container text-truncate">
                <h6 class="text-truncate">{{ discoveries[j - 1].takenDate }}</h6>
                <h4 class="text-truncate">{{ discoveries[j - 1].title }}</h4>
                <h6 class="text-truncate">{{ discoveries[j - 1].userName }}</h6>
              </div>
            </div>
          </div>
        </div>
      </v-container>

      <br/>
      <br/>

      <!--Navigation menu on the left side-->
      <v-navigation-drawer
          v-model="drawer"
          fixed
          temporary
      >
        <v-list
            nav
            dense
        >
          <!--Avatar + name-->
          <v-list-item two-line>
            <v-list-item-avatar size="70">
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Seppe Fleerackers</v-list-item-title>
              <v-list-item-subtitle>@seppe.f</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!--Menu options-->
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-tree-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Discoveries</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-account-plus-outline</v-icon>
              <v-badge color="red" :content="notifications" overlap></v-badge>
            </v-list-item-icon>
            <v-list-item-title>Friends</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Badges</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Map</v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Settings button-->
        <template v-slot:append>
          <div class="pa-2">
            <v-btn text :ripple="false">
              <v-icon large color=var(--main-color) left>mdi-cog-outline</v-icon>
              Settings
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <!--Navigation menu at the bottom-->
      <v-bottom-navigation
          fixed
          grow
          extended>
        <v-btn color="white" :ripple="false">
          <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
        </v-btn>
        <v-btn color=var(--dark-color) :ripple="false">
          <v-icon x-large color="white">mdi-camera-plus-outline</v-icon>
        </v-btn>
        <v-btn color="white" :ripple="false">
          <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
import leaf1 from "@/components/leaf1";
import leaf2 from "@/components/leaf2";
import leaf3 from "@/components/leaf3";
import leaf4 from "@/components/leaf4";
import leaf5 from "@/components/leaf5";
import axios from 'axios'


export default {
  name: 'App',

  components: {leaf1, leaf2, leaf3, leaf4, leaf5},

  data: () => ({
    url : "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg",
    discoveries: null,

    drawer: false,
    group: null,
    notifications: 2,
    avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",

  }),

  mounted() {
    axios.get('/public/feedcontroller/getDiscoveries').then(response => (this.discoveries = response["data"]))
  },

  watch: {
    group() {
      this.drawer = false
    },
  },

  computed: {
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return "repeat(1, 400px)"
        case 'sm':
          return "repeat(2, 400px)"
        case 'md':
          return "repeat(2, 400px)"
        case 'lg':
          return "repeat(3, 400px)"
        case 'xl':
          return "repeat(3, 400px)"
      }
      return 1;
    },
  },
};
</script>

<style>
@import '../styles.css';

.leaf_grid{
  display: grid;
  grid-template-rows: auto;

  place-items: center center;
  justify-content: center;
}


.discovery_container {
  position: relative;
  width: 90%;
  max-width: 400px;
  height: auto;
}

.info_container {
  position: absolute;
  top: 80%;
  background-color: rgba(255, 255, 255, 0.5);
}

.avatar_container {
  display: inline-block;
}

.discovery_text_container {
  display: inline-block;
  float: right;
  padding-left: 8px;
  height: auto;
  width: 250px;
  text-align: left;
}

.leaf {
  margin: 4px;
}

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

</style>