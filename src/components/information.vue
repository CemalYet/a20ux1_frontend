<template>
  <v-container class="justify-center">
    <br>
    <v-card
        id="card"
        color="rgb(249 , 249, 249, 0.85)"
    >
      <v-progress-linear
          :value=updateInformationCard.percentage
          color=var(--dark-color)
          class="mx-auto white--text"
          height="24"
      >
        {{ updateInformationCard.percentage }}%
      </v-progress-linear>
      <v-card-title class="headline">
        {{ updateInformationCard.title }}
      </v-card-title>
      <v-card-subtitle>
        <p class="font-italic" style="margin: 0">
          {{ updateInformationCard.subtitle }}
        </p>
      </v-card-subtitle>
      <div id="image_div">
        <v-img
            id="image"
            :src="updateInformationCard.src"
        >
        </v-img>
      </div>
      <v-card-actions class="justify-center">
        <v-btn
            class="white--text"
            color=var(--dark-color)
            @click="goToShare"
        >
          CONTINUE WITH THIS PLANT
        </v-btn>
      </v-card-actions>
      <p id="information_text">
        {{ updateInformationCard.info }}
      </p>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "information",

  metaInfo:{
    title: "Plant information",
  },

  data: () => ({
    cards: null,
  }),

  computed:{
    updateInformationCard(){
      return this.$store.getters.getInformationCards[this.updateCardId];
    },
    updateCardId(){
      return this.$store.getters.getCardId;
    }
  },

  methods:{
    goToShare(){
      this.$router.push({path: '/share'})
    }
  }
}
</script>

<style scoped>
#card {
  width: 90%;
  max-width: 750px;
  margin: auto;
  height: auto;
  padding-bottom: 2px;
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