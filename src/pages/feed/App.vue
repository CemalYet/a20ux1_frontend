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

      <!--Grid of Leaves-->
      <v-container>
        <v-row
            v-for="j in (discoveries.length/itemsPerRow)"
            :key="j"
            justify="center"
        >
          <v-col
              v-for="k in itemsPerRow"
              :key="k"
              align="center"
          >
            <div class="discovery_container">

              <leaf1 class="leaf" v-if="discoveries[j-1].leafID === 0" v-bind:discoveries="discoveries[j-1]"/>
              <leaf2 class="leaf" v-if="discoveries[j-1].leafID === 1" v-bind:discoveries="discoveries[j-1]"/>
              <leaf3 class="leaf" v-if="discoveries[j-1].leafID === 2" v-bind:discoveries="discoveries[j-1]"/>
              <leaf4 class="leaf" v-if="discoveries[j-1].leafID === 3" v-bind:discoveries="discoveries[j-1]"/>
              <leaf5 class="leaf" v-if="discoveries[j-1].leafID === 4" v-bind:discoveries="discoveries[j-1]"/>

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
                  <h6>{{ discoveries[j - 1].date }}</h6>
                  <h4>{{ discoveries[j - 1].title }}</h4>
                  <h6>{{ discoveries[j - 1].username }}</h6>
                </div>
              </div>
            </div>
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

export default {
  name: 'App',

  components: {leaf1, leaf2, leaf3, leaf4, leaf5},

  data: () => ({
    i: 1,
    discoveries: [
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
        picture: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
        leafID: 0,
        username: "Seppe Fleerackers",
        date: "Yesterday 11:43",
        title: "Mushroom I spotted this morning!"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598",
        picture: "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
        leafID: 1,
        username: "Marnix Lijnen",
        date: "Yesterday 12:43",
        title: "Walking with the boys"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/71499627_2643828155667264_8670036088552685568_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=7JZcQkduNz4AX9epCIn&_nc_ht=scontent-bru2-1.xx&oh=77a9c3c4a11f0ad0f86c78288349ccad&oe=5FCA7F28",
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg/1200px-Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg",
        leafID: 2,
        username: "Helena Majoor",
        date: "Yesterday 12:43",
        title: "Walking with the girls"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/64679357_2322740734614282_6203291312234430464_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=PitKaogm5B8AX8yIcyY&_nc_ht=scontent-bru2-1.xx&oh=479eea55195404be5f5296a91c782c10&oe=5FC9BBE7",
        picture: "https://theday.co.uk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWswT1RNM05XUXpNaTB6WWprekxUUTRPR010T0RJeE5TMDJNREZpTURnMFpUTm1OREFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--cd717cd0a3f3db326a7f2808b1db0a281e27cc73/-images-stories-2019-2019-09-2019-09-19_sunflowers.jpg",
        leafID: 3,
        username: "Juliana Buzanello",
        date: "2/10 at 12:15",
        title: "Morning hike"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/119704647_3219531741455823_89414004719577010_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=SO6L9J8aGewAX9HxnoD&_nc_ht=scontent-bru2-1.xx&oh=41547f9a45d4a328835c7e7c62113949&oe=5FCB52C6",
        picture: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg",
        leafID: 4,
        username: "Benno Debals",
        date: "2/10 at 12:15",
        title: "Walking with Juliana"
      },
      {
        avatar: "https://0.academia-photos.com/138336188/39712439/32771085/s200_cemal.yeti_mi_.jpg",
        picture: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2015/07/VAN-LAKE-2-940x627.jpg",
        leafID: 3,
        username: "Cemal Yetismis",
        date: "9/8 at 15:20",
        title: "Discovering Turkish nature"
      },

    ],

    drawer: false,
    group: null,
    notifications: 2,
    avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",

  }),
  watch: {
    group() {
      this.drawer = false
    },
  },

  computed: {
    itemsPerRow() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 1
        case 'sm':
          return 1
        case 'md':
          return 1
        case 'lg':
          return 1
        case 'xl':
          return 1
      }
      return 1;
    },
  },
};
</script>

<style>
@import '../styles.css';

.discovery_container {
  position: relative;
  width: 400px;
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