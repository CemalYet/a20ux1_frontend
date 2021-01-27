<template>
  <v-container>
    <br>
    <h4>Select a theme:</h4>
  <div class="text-center">
    <v-select
        id="select"
        v-model="select"
        :items="items"
        item-text="title"
        return-object
        single-line
        :label="select.title"
        color="var(--dark-color)">
    </v-select>
    <v-btn @click="updateTheme(select.title);refresh();">APPLY</v-btn>
  </div>
    <br>
    <h4>Change the reminder settings:</h4>
      <v-btn-toggle
          v-model="toggle_multiple"
          multiple
          group
          borderless
          outlined
          class="daybuttons"
      >
        <v-btn
            value="1"
            elevation="2"
            class="btn"
        >
          Mo
        </v-btn>
        <v-btn
            elevation="2"
            value="2"
            class="btn"
        >
          Tu
        </v-btn>
        <v-btn
            elevation="2"
            value="3"
            class="btn"
        >
          We
        </v-btn>
        <v-btn
            elevation="2"
            value="4"
            class="btn"
        >
          Th
        </v-btn>
        <v-btn
            elevation="2"
            value="5"
            class="btn"
        >
          Fr
        </v-btn>
        <v-btn
            elevation="2"
            value="6"
            class="btn"
        >
          Sa
        </v-btn>
        <v-btn
            elevation="2"
            value="7"
            class="btn"
        >
          Su
        </v-btn>
      </v-btn-toggle>
    <br>
    <div class="apply">
      <v-btn @click="updateReminder">APPLY</v-btn>
    </div>
  </v-container>
</template>

<script>
//import axios from "axios";

export default {
  name: "settings",

  data: () => ({
    select: {title: null},
    items: [
      {title: 'Summer'},
      {title: 'Fall'},
      {title: 'Winter'},
      {title: 'Spring'},
      {title: 'Seasons'},
    ],
    toggle_multiple: []
  }),

  methods: {
    updateTheme(season) {
      this.$store.commit("changeTheme", season);
    },
    updateReminder() {
      this.$store.dispatch("updateReminder", this.toggle_multiple);
    },
    refresh() {
      this.$router.back();
    },
  },

  mounted() {
      this.select.title = this.$store.getters.getTheme;
  }
}
</script>

<style scoped>
#select {
  width: 80vw;
  max-width: 500px;
}

.daybuttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  max-width: 300px;
}

.apply {
  display: flex;
  justify-content: center;
}
</style>