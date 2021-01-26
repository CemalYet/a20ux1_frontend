<template>
  <v-btn
      icon
      @click.stop="openDialog"
      v-if="checkPostOwner"
  >
    <v-icon large color=var(--dark-color)>{{ mdiTrashCanOutline }}</v-icon>
  </v-btn>


</template>

<script>
import {mdiTrashCanOutline} from '@mdi/js';
export default {
  name: "deleteButton",

  date:()=>({
    mdiTrashCanOutline: mdiTrashCanOutline
  }),

  methods: {
    openDialog() {
      this.$store.commit('updateDeleteDialog', true);
    }
  },

  computed:{
    checkPostOwner(){
      if(this.$store.getters.getDiscoveryPostData.length !== 0){
        if (this.$store.getters.getDiscoveryPostData[0].userId === this.$store.getters.getLoggedInUserData[0].userId){
          return true;
        }
      }
      return false;
    }
  },

}
</script>