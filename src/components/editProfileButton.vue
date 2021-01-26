<template>
  <v-btn
      icon
      @click.native="goToEditProfile"
      v-if="this.$route.params.id === this.$store.getters.getLoggedInUserData[0].userId"
  >
    <v-icon large color=var(--dark-color)>mdi-account-edit-outline</v-icon>
  </v-btn>

</template>

<script>
export default {
  name: "editProfileButton",

  methods:{
    goToEditProfile(){
      this.$router.push({path: 'profile/edit'})
    }
  }
}
</script>