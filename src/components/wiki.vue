<template>
  <div>
    <br>
    <v-list class="list">
      <v-list-item-title
          class="list"
          v-for="plant in plants"
          :key="plant"
          v-on:click="getWikipedia(plant.title)">
        {{ plant.title }}
      </v-list-item-title>
    </v-list>
    <p>{{ data }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "wiki",

  data: () => ({
    plants: null,
    data: null,
  }),

  methods: {
    getWikipedia(search) {
      this.data = null;
      axios.post('https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + search + '&origin=*&callback=',
          {headers: {'Content-Type': 'application/json'}})
          .then(response => {
        this.data = response["data"];
      });
    }
  },

  mounted() {
    axios.get('/public/WikiController/getWikiData', {params: {userId: 130}}).then(response => {
      this.plants = response["data"];
    });
  }
}
</script>

<style scoped>
.list {
  background: transparent;
}
</style>