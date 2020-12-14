<template>
  <div>
    <br>
    <v-list class="list">
      <v-list-item-title
          class="list"
          v-for="plant in plants"
          :key="plant">
        {{ plant.title }}
      </v-list-item-title>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "wiki",

  data: () => ({
    plants: null,
  }),

  mounted() {
    axios.get('/public/WikiController/getWikiData', {params: {userId: 130}}).then(response => {
      this.plants = response["data"];
    })
  }
}
</script>

<style scoped>
.list {
  background: transparent;
}
</style>