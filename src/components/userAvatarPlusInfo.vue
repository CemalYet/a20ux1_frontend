<template>
  <v-list-item two-line>
    <v-list-item-avatar size="70">
      <v-img :src="getUserData.avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{getUserData.userName}}</v-list-item-title>
      <v-list-item-subtitle>{{getUserData.emailAddress}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "userAvatarPlusInfo",

  computed:{
    getUserData(){
      return this.$store.getters.getUserData;
    }
  }
}
</script>

<style scoped>

</style>