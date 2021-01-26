<template>
  <v-bottom-navigation
      fixed
      grow
      extended>
    <v-btn
        text
        :ripple="false"
        color="var(--dark-color)"
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

</template>

<script>
export default {
  name: "cancelConfirmBottomNavBar",

  methods:{
    check_data: function() {
      if (this.$store.getters.getTitle === null || this.$store.getters.getChosen_leaf === null) {
        this.$store.commit("updateSnackbar", true);
      }
      else {
        this.$store.dispatch('sharePost');
      }
    }
  }
}
</script>