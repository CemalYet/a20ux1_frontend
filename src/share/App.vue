<template>
  <v-app>
    <!--Bar at the top of the page-->
    <v-app-bar
        fixed
        color="white"
        elevation="1"
    >
      <!--Back button-->
      <v-btn icon>
        <v-icon large color=var(--dark-color)>mdi-arrow-left</v-icon>
      </v-btn>

      <!--Page title-->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Share</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>
      <br/>

      <!--Text fields aka user input-->
      <v-container>
        <div class="wrapper">
          <!--Text input TITLE-->
          <div class="title">
            <v-text-field
                class="text_field"
                dense
                label="TITLE"
                v-model="title"
                outlined
                color=var(--dark-color)
                hide-details
                :rules="[rules.required]"
            ></v-text-field>
          </div>

          <!--Modal input HOUR-->
          <div class="hour">
            <v-dialog
                ref="time_dialog"
                v-model="time_modal"
                :return-value.sync="timestamp"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    class="text_field"
                    dense
                    v-model="timestamp"
                    label="HOUR"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color=var(--dark-color)
                    hide-details
                ></v-text-field>
              </template>
              <v-time-picker
                  v-if="time_modal"
                  v-model="timestamp"
                  full-width
                  color=var(--main-color)
                  format="24hr"
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color=var(--dark-color)
                    @click="time_modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color=var(--dark-color)
                    @click="$refs.time_dialog.save(timestamp);"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </div>

          <!--Modal input DATE-->
          <div class="day">
            <v-dialog
                ref="date_dialog"
                v-model="date_modal"
                :return-value.sync="current_date"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    class="text_field"
                    dense
                    v-model="current_date"
                    label="DATE"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color=var(--dark-color)
                    hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="current_date"
                  scrollable
                  color=var(--main-color)
                  :max="getMaxDate()"
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color=var(--dark-color)
                    @click="date_modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color=var(--dark-color)
                    @click="$refs.date_dialog.save(current_date);"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>

          <!--Text input LOCATION-->
          <div class="location">
            <v-text-field
                class="text_field"
                dense
                label="LOCATION"
                v-model="location"
                outlined
                color=var(--dark-color)
                hide-details
            ></v-text-field>
          </div>

          <!--Button camera-->
          <div class="camera_button">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                :ripple="false"
                fab
                height="80px"
                width="80px"
            >
              <v-icon x-large color="white">mdi-camera-plus-outline</v-icon>
            </v-btn>
          </div>

          <!--Buttons-->
          <div class="plus_button">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                rounded
                :ripple="false"
                v-on="on"
            >
              <v-icon color="white">mdi-plus</v-icon>
              <h3 class="button_text">FRIEND</h3>
            </v-btn>
          </div>

          <div class="leaf_button">
            <v-dialog
                v-model="leaf_dialog"
                scrollable
                max-width="80vw"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color=var(--dark-color)
                    elevation="2"
                    rounded
                    :ripple="false"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon color="white">mdi-leaf</v-icon>
                  <h3 class="button_text">LEAF</h3>
                </v-btn>
              </template>
              <v-card>
                <v-card-title align="center">Chose leaf shape</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 40vw;">
                  <div class="parent">
                    <div class="top_row">
                      <leaf1 class="leaf" @click.native="select_leaf(1); leaf_dialog = false"/>
                      <leaf2 class="leaf" @click.native="select_leaf(2); leaf_dialog = false"/>
                      <leaf3 class="leaf" @click.native="select_leaf(3); leaf_dialog = false"/>
                    </div>
                    <div class="bottom_row">
                      <leaf4 class="leaf" @click.native="select_leaf(4); leaf_dialog = false"/>
                      <leaf5 class="leaf" @click.native="select_leaf(5); leaf_dialog = false"/>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>

          <div class="tags">
            <v-avatar class="avatars elevation-6">
              <img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=iEnUTezF7M0AX9l4Blf&_nc_ht=scontent-bru2-1.xx&oh=ad6d77ef7b00135578e999dfc409129d&oe=5FCECE41"
                  alt="">
            </v-avatar>
            <v-avatar class="avatars elevation-6">
              <img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/72281335_3233116936715489_818658218732421120_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=RdqSnTG_rdMAX-4kET-&_nc_ht=scontent-bru2-1.xx&oh=6aeb2fb674f01ad8802760f5315129bc&oe=5FCD7A18"
                  alt="">
            </v-avatar>
            <v-avatar class="avatars elevation-6">
              <img
                  src="https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/71499627_2643828155667264_8670036088552685568_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=w6TlLBPM4coAX8ftlce&_nc_ht=scontent-bru2-1.xx&oh=cb334c83c12b7b2d6e08bc3ef6571c56&oe=5FCE73A8"
                  alt="">
            </v-avatar>
          </div>

          <div class="leafId">
            <leaf1 class="small_leaf" v-if="chosen_leaf === 1"/>
            <leaf2 class="small_leaf" v-else-if="chosen_leaf === 2"/>
            <leaf3 class="small_leaf" v-else-if="chosen_leaf === 3"/>
            <leaf4 class="small_leaf" v-else-if="chosen_leaf === 4"/>
            <leaf5 class="small_leaf" v-else-if="chosen_leaf === 5"/>
          </div>

          <!--Text input DESCRIPTION-->
          <div class="description">
            <v-textarea
                class="text_area"
                id="description_box"
                label="DESCRIPTION"
                v-model="description"
                outlined
                color=var(--dark-color)
                no-resize
                rows="3"
                dense
                hide-details
            ></v-textarea>
          </div>
        </div>
      </v-container>

      <v-snackbar
          v-model="snackbar"
          centered="true"
          color="error"
      >
        Please fill in a title and choose a leaf.
        <template v-slot:action="{ attrs }">
          <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <!--Navigation menu at the bottom-->
      <v-bottom-navigation
          fixed
          grow
          extended>
        <v-btn
            text
            :ripple="false"
            color="var(--dark-color)"
            v-on:click="getTime"
        >
          <h3>CANCEL</h3>
        </v-btn>
        <v-btn
            text
            :ripple="false"
            color="var(--dark-color)"
            v-on:click="check_data"
        >
          <h3>CONFIRM</h3>
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
import axios from "axios";

export default {
  name: 'App',
  components: {leaf1, leaf2, leaf3, leaf4, leaf5},

  data: () => ({
    time_modal: false,
    date_modal: false,

    title: null,
    rules: {
      required: value => !!value || 'Title required.',
    },
    timestamp: null,
    current_date: null,
    location: null,

    time_dialog: false,
    date_dialog: false,
    leaf_dialog: false,
    chosen_leaf: null,

    description: null,

    latitude: null,
    longitude:null,

    snackbar: false,

    group: null,
    data: null,
  }),

  created() {
    this.getTime();
    this.getDate();
  },

  mounted() {
    axios.get('/public/sharecontroller/getFriends').then(response => (this.data = response["data"]))
    //axios.defaults.baseURL='http://localhost:8081/';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        error => {
          console.log(error.message);
        },
    )
  },

  methods: {
    getTime: function () {
      const today = new Date();
      this.timestamp = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    },
    getDate: function () {
      const today = new Date();
      this.current_date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    },
    getMaxDate: function () {
      const today = new Date();
      return today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    },
    save: function () {
      const json = JSON.stringify({
        my_title: this.title,
        my_time: this.timestamp,
        my_date: this.current_date,
        my_location: this.location,
        my_description: this.description,
        my_leaf: this.chosen_leaf,
        my_latitude: this.latitude,
        my_longitude: this.longitude,
      });
      const res = axios.post('/public/sharecontroller/save', json,
          {
            headers: {'Content-Type': 'application/json'}
          });
      console.log(res)
    },
    select_leaf: function (int) {
      this.chosen_leaf = int;
    },
    check_data: function() {
      if (this.title === null || this.chosen_leaf === null) {
        this.snackbar = true;
      }
      else {
        this.save();
      }
    }
  },
};
</script>

<style>
@import '../styles.css';

#main {
  background-image: url(../leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.text_field {
  background-color: white;
  max-width: 70vw;
}

.button_text {
  color: white;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 0.7fr) 0.2fr 1fr 2fr;
}

.title {
  grid-area: 1 / 1 / 2 / 7;
}

.hour {
  grid-area: 2 / 1 / 3 / 7;
}

.day {
  grid-area: 3 / 1 / 4 / 7;
}

.location {
  grid-area: 4 / 1 / 5 / 7;
}

.camera_button {
  grid-area: 1 / 7 / 5 / 13;
  margin: auto;
}

.plus_button {
  grid-area: 5 / 1 / 6 / 7;
  margin: auto;
}

.leaf_button {
  grid-area: 5 / 7 / 6 / 13;
  margin: auto;
}

.tags {
  grid-area: 6 / 1 / 7 / 7;
  margin: auto;
}

.leafId {
  grid-area: 6 / 7 / 7 / 13;
  margin: auto;
}

.description {
  grid-area: 7 / 1 / 8 / 13;
  display: flex;
}

.text_area {
  background-color: white;
  max-width: 100%;
}

.avatars {
  margin: 6px -6px 20px;
}

.leaf {
  width: 15vw;
  height: 15vw;
  margin: 1vw 1vw;
}

.parent {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 1vw;
}

.top_row {
  grid-area: 1 / 1 / 2 / 7;
  margin: auto;
}

.bottom_row {
  grid-area: 2 / 2 / 3 / 6;
  margin: auto;
}

.small_leaf {
  margin: 6px 20px;
  height: 48px;
  width: auto;
}
</style>