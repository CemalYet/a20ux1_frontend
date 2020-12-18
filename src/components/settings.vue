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
  </v-container>
</template>

<script>
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
  }),

  methods: {
    updateTheme(season) {
      this.$store.commit("changeTheme", season);
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
</style>