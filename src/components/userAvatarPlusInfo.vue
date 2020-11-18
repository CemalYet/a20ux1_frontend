<template>
  <v-list-item two-line>
    <v-list-item-avatar size="70">
      <v-img :src="this.$store.getters.getUserData[0].avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{this.$store.getters.getUserData[0].userName}}</v-list-item-title>
      <v-list-item-subtitle>{{this.$store.getters.getUserData[0].emailAddress}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "userAvatarPlusInfo"
}
</script>

<style scoped>

</style>