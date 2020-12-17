<template>
  <v-btn
      icon
      @click.stop="openDialog"
      v-if="checkPostOwner"
  >
    <v-icon large color=var(--dark-color)>mdi-trash-can-outline</v-icon>
  </v-btn>


</template>

<script>
export default {
  name: "deleteButton",

  methods: {
    openDialog() {
      this.$store.commit('updateDeleteDialog', true);
    }
  },

  computed:{
    checkPostOwner(){
      if(this.$store.getters.getDiscoveryPostData.length !== 0){
        if (this.$store.getters.getDiscoveryPostData[0].userId === this.$store.getters.getLoggedInUserData[0].userId){
          return true;
        }
      }
      return false;
    }
  },

}
</script>

<style scoped>

</style>