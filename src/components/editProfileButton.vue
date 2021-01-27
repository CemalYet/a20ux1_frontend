<template>
  <v-btn
      icon
      @click.native="goToEditProfile"
      v-if="this.$route.params.id === this.$store.getters.getLoggedInUserData[0].userId"
  >
    <v-icon large color=var(--dark-color)>{{ mdiAccountEditOutline }}</v-icon>
  </v-btn>

</template>

<script>
import {mdiAccountEditOutline} from '@mdi/js';
export default {
  name: "editProfileButton",

  data:()=>({
    mdiAccountEditOutline: mdiAccountEditOutline
  }),

  methods:{
    goToEditProfile(){
      this.$router.push({path: 'profile/edit'})
    }
  }
}
</script>