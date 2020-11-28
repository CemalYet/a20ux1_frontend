<template>
  <v-container>
    <br>
    <v-slide-group>
      <v-slide-item
          v-for="(card, i) in cards"
          :key="i"
      >
        <v-card
            id="card"
            color="rgb(249 , 249, 249, 0.85)"
        >
          <v-progress-linear
              :value=card.percentage
              color=var(--dark-color)
              class="mx-auto white--text"
              height="24"
          >
            {{ card.percentage }}%
          </v-progress-linear>
          <v-card-title class="headline">
            {{ card.title }}
          </v-card-title>
          <v-card-subtitle>
            <p class="font-italic" style="margin: 0">
              {{ card.subtitle }}
            </p>
          </v-card-subtitle>
          <div id="image_div">
            <v-img
                id="image"
                :src="card.src"
            >
            </v-img>
          </div>
          <v-card-actions class="justify-center">
            <v-btn
                class="white--text"
                color=var(--dark-color)
            >
              CONTINUE WITH THIS PLANT
            </v-btn>
          </v-card-actions>
          <p id="information_text">
            {{ card.info }}
          </p>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-container>
</template>

<script>
export default {
  name: "information",

  data: () => ({ //TODO: get the same data from the API as previous page instead of using dummy data
    cards: null,
  }),

  mounted() {
    this.cards = this.$store.getters.getInformationCards;
  }
}
</script>

<style scoped>
#card {
  width: 290px;
  height: auto;
  margin: 5px 20px 5px 0;
}

#image {
  max-height: 100%;
  max-width: 100%;
}

#image_div {
  width: 250px;
  height: 250px;
  margin: auto;
}

#information_text {
  margin: 0 20px 20px;
  height: auto;
}

</style>