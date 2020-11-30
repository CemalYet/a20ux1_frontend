<template>
  <v-list-item two-line>
    <avatar :size="70" :user-name="getUserData.userName" :picture="getUserData.avatar"
            @click.native="goToUser(getUserData.userId)"></avatar>
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