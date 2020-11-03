<style>
@import '../styles.css';
</style>

<template>
  <v-app>
    <!--Bar at the top of the page-->
    <v-app-bar
        hide-on-scroll
        absolute
        color="white"
        scroll-target="#scrolling-techniques-4"
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
    <v-main>
      <br/>
      <br/>

      <!--Grid of Leaves-->
      <v-container>
        <v-row
            v-for="n in 5"
            :key="n"
            cols="12"
            sm="3"
        >
          <v-col
              v-for="n in 4"
              :key="n"
              cols="12"
              sm="3"
          >
            <svg viewBox="0 0 600 600">
              <defs>
                <clipPath id="leaf">
                  <path :d="leaf_shape" transform="translate(0 50)"/>
                </clipPath>
              </defs>

              <path :d="leaf_shape" transform="translate(0 50)"/>

              <g clip-path="url(#leaf)">
                <image preserveAspectRatio="xMidYMid slice" :xlink:href="picture" transform="translate(0 50)"/>
              </g>

              <defs>
                <clipPath id="profile">
                  <circle r=77 cx=450 cy=475></circle>
                </clipPath>
              </defs>

              <circle r=77 cx=450 cy=475></circle>

              <g clip-path="url(#profile)">
                <image preserveAspectRatio="xMidYMid slice" :xlink:href="avatar"/>
              </g>
            </svg>
          </v-col>
        </v-row>
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
        <v-btn
            color=var(--dark-color)
            fab
            elevation="2"
            raised
            rounded
            :ripple="false"
        >
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

export default {
  name: 'App',

  components: {},

  data: () => ({
    drawer: false,
    group: null,
    notifications: 2,
    avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
    leaf_shape: "M503.141,8.696c-0.016,0-215.215-56.483-390.225,118.511 C-31.579,271.711,96.155,415.69,96.155,415.69s143.979,127.742,288.476-16.775C559.64,223.928,503.156,8.728,503.141,8.696z",
    picture: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
};
</script>
