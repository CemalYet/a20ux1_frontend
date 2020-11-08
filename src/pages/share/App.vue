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
      <v-container>
        <div class="wrapper">
          <!--Text fields aka user input-->
          <div class="title">
            <v-text-field
                class="text_field"
                label="TITLE"
                v-model="title"
                outlined
                color=var(--dark-color)
            ></v-text-field>
          </div>

          <div class="hour">
            <v-text-field
                type="time"
                class="text_field"
                label="HOUR"
                v-model="timestamp"
                outlined
                color=var(--dark-color)
            ></v-text-field>
          </div>

          <div class="day">
            <v-text-field
                type="date"
                class="text_field"
                label="DAY"
                v-model="current_date"
                outlined
                color=var(--dark-color)
            ></v-text-field>
          </div>

          <div class="location">
            <v-text-field
                class="text_field"
                label="LOCATION"
                :value="location"
                outlined
                color=var(--dark-color)
            ></v-text-field>
          </div>

          <div class="camera_button">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                :ripple="false"
                fab
                x-large
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
            >
              <v-icon x-large color="white">mdi-plus</v-icon>
              <h2 class="button_text">FRIEND</h2>
            </v-btn>
          </div>

          <div class="leaf_button">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                rounded
                :ripple="false"
            >
              <v-icon x-large color="white">mdi-leaf</v-icon>
              <h2 class="button_text">LEAF</h2>
            </v-btn>
          </div>

          <div class="tags">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                rounded
                :ripple="false"
            >
              <v-icon x-large color="white"></v-icon>
              <h5 class="button_text">added friends</h5>
            </v-btn>
          </div>

          <div class="leafId">
            <v-btn
                color=var(--dark-color)
                elevation="2"
                rounded
                :ripple="false"
            >
              <h5 class="button_text">chosen leaf</h5>
            </v-btn>
          </div>

          <!--Description box-->
          <div class="description">
            <v-text-field
                class="text_field"
                id="description_box"
                label="DESCRIPTION"
                :value="description"
                outlined
                color=var(--dark-color)
            ></v-text-field>
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
          CANCEL
        </v-btn>
        <v-btn
            text
            :ripple="false"
            color="var(--dark-color)"
            v-on:click="getDate"
        >
          CONFIRM
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    title: "",
    timestamp: "",
    current_date: "",
    location: "",
    description: "",
    group: null,
  }),

  created() {
    this.getTime();
    this.getDate();
  },

  methods: {
    getTime: function () {
      const today = new Date();
      this.timestamp = today.getHours() + ":" + today.getMinutes();
    },
    getDate: function () {
      const today = new Date();
      this.current_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
}

.button_text {
  color: white;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(4, 1fr) repeat(3, 0.5fr) 1fr;
  grid-column-gap: 10px;
}

.title {
  grid-area: 1 / 1 / 2 / 9;
}

.hour {
  grid-area: 2 / 1 / 3 / 9;
}

.day {
  grid-area: 3 / 1 / 4 / 9;
}

.location {
  grid-area: 4 / 1 / 5 / 9;
}

.camera_button {
  grid-area: 1 / 9 / 5 / 13;
  margin: auto;
}

.plus_button {
  grid-area: 5 / 4 / 6 / 7;
  margin: auto
}

.leaf_button {
  grid-area: 5 / 7 / 6 / 10;
  margin: auto
}

.tags {
  grid-area: 6 / 4 / 7 / 7;
  margin: auto
}

.leafId {
  grid-area: 6 / 7 / 7 / 10;
  margin: auto
}

.description {
  grid-area: 8 / 1 / 9 / 13;
  display: flex;
}
</style>