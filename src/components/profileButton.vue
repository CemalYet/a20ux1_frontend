<template>
  <div>
    <avatar
        v-if="getUserData[0].avatar !== null"
        :size="32"
        :user-name="getUserData[0].userName"
        :picture="getUserData[0].avatar"
        @click.native="goToProfile"
        style="margin-right: 0 !important;"
    >
    </avatar>
    <v-btn
        v-else
        icon
        @click.native="goToProfile"
        style="margin-right: -12px !important;"
    >
      <v-icon large color=var(--dark-color)>{{ mdiAccountCircleOutline }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import avatar from "@/components/avatar";
import {mdiAccountCircleOutline} from '@mdi/js';
export default {
  name: "profileButton",

  data:()=>({
    mdiAccountCircleOutline: mdiAccountCircleOutline,
  }),

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