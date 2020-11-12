<template>
  <v-app>
    <!--Bar at the top of the page-->
    <router-view name="appBar"></router-view>

    <!--Navigation menu on the left side-->
    <router-view name="navDrawer"></router-view>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>
      <br/>

      <!--Grid of Leaves-->
      <v-container>
        <div class="leaf_grid"
             :style="{'grid-template-columns': itemsPerRow}"
        >
          <div class="discovery_container" v-for="j in discoveries.length" :key="j">

            <leaf1 class="leaf" v-if="discoveries[j-1].leafId === '0'" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf2 class="leaf" v-else-if="discoveries[j-1].leafId === '1'" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf3 class="leaf" v-else-if="discoveries[j-1].leafId === '2'" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf4 class="leaf" v-else-if="discoveries[j-1].leafId === '3'" v-bind:picture="discoveries[j-1].photoPath"/>
            <leaf5 class="leaf" v-else-if="discoveries[j-1].leafId === '4'" v-bind:picture="discoveries[j-1].photoPath"/>

            <div class="info_container">
              <div class="avatar_container">
                <v-avatar
                    class="elevation-8"
                    size="56"
                >
                  <img :src="discoveries[j-1].avatar" alt="">
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

      <!--Navigation menu at the bottom-->
      <v-bottom-navigation
          fixed
          grow
          extended>
        <v-btn color="white" :ripple="false">
          <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
        </v-btn>
        <v-btn color=var(--dark-color) :ripple="false" window.location.href="/camera">
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
import leaf1 from "@/components/leaves/leaf1";
import leaf2 from "@/components/leaves/leaf2";
import leaf3 from "@/components/leaves/leaf3";
import leaf4 from "@/components/leaves/leaf4";
import leaf5 from "@/components/leaves/leaf5";
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";
//import axios from 'axios'


export default {
  name: 'App',

  watch: {
    group() {
      this.$store.commit("drawerFalse")
      //this.$store.commit("drawerFalse");
    },
  },

  components: {
    leaf1,
    leaf2,
    leaf3,
    leaf4,
    leaf5,
    // eslint-disable-next-line vue/no-unused-components
    appBar,
    // eslint-disable-next-line vue/no-unused-components
    navDrawer
  },

  data: () => ({
    group: null,
    discoveries: [
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
        photoPath: "https://img.freepik.com/vrije-photo/close-up-van-een-giftige-rode-muhamor-paddestoel-in-het-bos_75145-275.jpg?size=626&ext=jpg",
        leafId: '0',
        userName: "Seppe Fleerackers",
        takenDate: "Yesterday 11:43",
        title: "Mushroom I spotted this morning!"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598",
        photoPath: "https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree.jpg",
        leafId: '1',
        userName: "Marnix Lijnen",
        takenDate: "Yesterday 12:43",
        title: "Walking with the boys"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/71499627_2643828155667264_8670036088552685568_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=7JZcQkduNz4AX9epCIn&_nc_ht=scontent-bru2-1.xx&oh=77a9c3c4a11f0ad0f86c78288349ccad&oe=5FCA7F28",
        photoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg/1200px-Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg",
        leafId: '2',
        userName: "Helena Majoor",
        takenDate: "Yesterday 12:43",
        title: "Walking with the girls dit is een veel te lange tekst"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/64679357_2322740734614282_6203291312234430464_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=PitKaogm5B8AX8yIcyY&_nc_ht=scontent-bru2-1.xx&oh=479eea55195404be5f5296a91c782c10&oe=5FC9BBE7",
        photoPath: "https://theday.co.uk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWswT1RNM05XUXpNaTB6WWprekxUUTRPR010T0RJeE5TMDJNREZpTURnMFpUTm1OREFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--cd717cd0a3f3db326a7f2808b1db0a281e27cc73/-images-stories-2019-2019-09-2019-09-19_sunflowers.jpg",
        leafId: '3',
        userName: "Juliana Buzanello",
        takenDate: "2/10 at 12:15",
        title: "Morning hike"
      },
      {
        avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/119704647_3219531741455823_89414004719577010_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=SO6L9J8aGewAX9HxnoD&_nc_ht=scontent-bru2-1.xx&oh=41547f9a45d4a328835c7e7c62113949&oe=5FCB52C6",
        photoPath: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg",
        leafId: '4',
        userName: "Benno Debals",
        takenDate: "2/10 at 12:15",
        title: "Walking with Juliana"
      },
      {
        avatar: "https://0.academia-photos.com/138336188/39712439/32771085/s200_cemal.yeti_mi_.jpg",
        photoPath: "https://d36tnp772eyphs.cloudfront.net/blogs/1/2015/07/VAN-LAKE-2-940x627.jpg",
        leafId: '3',
        userName: "Cemal Yetismis",
        takenDate: "9/8 at 15:20",
        title: "Discovering Turkish nature"
      },

    ],

    userData: [
      {
        avatar: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ag-ed4FZ5DsAX_OoYsw&_nc_ht=scontent-bru2-1.xx&oh=7566a5438a01f20dcb8c0f5a9c3abf67&oe=5FC98598',
        emailAddress: 'marnix.lijnen@student.kuleuven.be',
        userName: 'Marnix Lijnen'
      }
    ],
  }),

  /*
  mounted() {
    axios.get('/public/feedcontroller/getDiscoveries').then(response => (this.discoveries = response["data"]))
    axios.get('/public/feedcontroller/getUserData').then(response => (this.userData = response["data"]))
  },

   */

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

  methods:{
    toggleDrawer(){
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>

<style>
@import 'styles.css';

.leaf_grid {
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