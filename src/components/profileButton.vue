<template>
  <avatar
      :size="32"
      :user-name="getUserData[0].userName"
      :picture="getUserData[0].avatar"
      @click.native="goToProfile"
      style="margin-right: 0 !important;"
  >

  </avatar>
</template>

<script>
import avatar from "@/components/avatar";
export default {
  name: "profileButton",

  components:{
    avatar
  },

  methods:{
    goToProfile(){
      this.$router.push({path: `/profile/${this.getLoggedInUserData[0].userId}`})
    }
  },

  computed:{
    getLoggedInUserData(){
      return this.$store.getters.getLoggedInUserData;
    },
    getUserData(){
      return this.$store.getters.getLoggedInUserData;
    }
  }
}
</script>

<style scoped>

</style>