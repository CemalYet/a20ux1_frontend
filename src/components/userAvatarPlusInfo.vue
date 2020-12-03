<template>
  <v-list-item
      two-line
      v-if="getLoggedInUserData.length !== 0"
  >
    <avatar :size="70" :user-name="getLoggedInUserData.userName" :picture="getLoggedInUserData.avatar"
            @click.native="goToUser(getLoggedInUserData.userId)"></avatar>
    <v-list-item-content>
      <v-list-item-title>{{getLoggedInUserData.userName}}</v-list-item-title>
      <v-list-item-subtitle>{{getLoggedInUserData.emailAddress}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Avatar from "@/components/avatar";
export default {
  name: "userAvatarPlusInfo",
  components: {Avatar},
  computed:{
    getLoggedInUserData(){
      return this.$store.getters.getLoggedInUserData[0];
    }
  },
  methods:{
    goToUser(user_id){
      console.log(user_id);
      if(typeof(user_id)!=='undefined'){
        this.$router.push({path: `/profile/${user_id}`})}
    }
  }
}
</script>

<style scoped>

</style>