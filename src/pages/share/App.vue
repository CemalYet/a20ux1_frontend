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
            ></v-text-field>
          </div>

          <!--Modal input HOUR-->
          <div class="hour">
            <v-dialog
                ref="dialog1"
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
                    @click="$refs.dialog1.save(timestamp);"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </div>

          <!--Modal input DATE-->
          <div class="day">
            <v-dialog
                ref="dialog"
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
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="current_date"
                  scrollable
                  color=var(--main-color)
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
                    @click="$refs.dialog.save(current_date); "
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
                v-bind="attrs"
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
                max-width="300px"
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
                <v-card-title>Chose leaf shape</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-radio-group v-model="chosen_leaf" mandatory>
                    <v-radio
                        color=var(--main-color)
                        v-for="n in 5"
                        :key="n"
                        :label="`Leaf ${n}`"
                        :value="n"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                      color=var(--dark-color)
                      text
                      @click="leaf_dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color=var(--dark-color)
                      text
                      @click="leaf_dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
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
            <v-card
                color=var(--light-color)
                elevation="2"
                rounded
            >
              <h5 class="button_text">{{ chosen_leaf }}</h5>
            </v-card>
          </div>

          <!--Text input DESCRIPTION-->
          <div class="description">
            <v-textarea
                class="text_field"
                id="description_box"
                label="DESCRIPTION"
                v-model="description"
                outlined
                color=var(--dark-color)
                dense
            ></v-textarea>
          </div>
        </div>
      </v-container>
      <br/>
      <br/>
      <br/>

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
            v-on:click="save"
        >
          <h3>CONFIRM</h3>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',

  data: () => ({
   time_modal: false,
   date_modal: false,

    title: null,
    timestamp: null,
    current_date: null,
    location: null,

    leaf_dialog: false,
    chosen_leaf: null,

    description: null,

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
    save: function () {
      const json = JSON.stringify({
        my_title: this.title,
        my_time: this.timestamp,
        my_date: this.current_date,
        my_location: this.location,
        my_description: this.description,
        my_leaf: this.chosen_leaf
      });
      const res = axios.post('/public/sharecontroller/save', json,
          {
            headers: {'Content-Type': 'application/json'}
          });
      console.log(res)
    },
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
  grid-template-rows: repeat(6, 0.5fr) 3fr;
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
  margin: auto
}

.leaf_button {
  grid-area: 5 / 7 / 6 / 13;
  margin: auto
}

.tags {
  grid-area: 6 / 1 / 7 / 7;
  margin: auto
}

.leafId {
  grid-area: 6 / 7 / 7 / 13;
  margin: auto
}

.description {
  grid-area: 7 / 1 / 8 / 13;
  display: flex;
}

.avatars {
  margin: 6px -6px 20px;
}
</style>