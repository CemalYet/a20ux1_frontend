<template>
  <v-menu offset-y v-if="this.$route.params.id === getCurrentData[0].userId">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon large color=var(--dark-color)>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="goToEdit">
        <v-icon
            color=var(--dark-color)
            left>
          mdi-account-edit-outline
        </v-icon>
        <v-list-item-title>Edit profile</v-list-item-title>
      </v-list-item>
        <v-list-item @click="logOut">
        <v-icon
            color=var(--dark-color)
            left>
          mdi-logout
        </v-icon>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "dropdownOptionsMenu",
  computed:{
    getCurrentData(){
      return this.$store.getters.getLoggedInUserData;
    }
  },
  methods:{
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push({path: '/login'});
    },
    goToEdit(){
      this.$router.push({path: 'profile/edit'})
    }
  }
}

</script>

<style scoped>

</style>