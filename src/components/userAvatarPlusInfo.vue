<template>
  <v-list-item two-line>
    <avatar :size="70" :user-name="getUserData.userName" :picture="getUserData.avatar"></avatar>
    <v-list-item-content>
      <v-list-item-title>{{getUserData.userName}}</v-list-item-title>
      <v-list-item-subtitle>{{getUserData.emailAddress}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Avatar from "@/components/avatar";
export default {
  name: "userAvatarPlusInfo",
  components: {Avatar},
  computed:{
    getUserData(){
      return this.$store.getters.getUserData[0];
    }
  }
}
</script>

<style scoped>

</style>