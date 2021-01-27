<template>
  <v-app-bar-nav-icon @click.stop="goBack">
    <v-icon large color=var(--dark-color)>{{ backButtonIcon }}</v-icon>
  </v-app-bar-nav-icon>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';
export default {
  name: "backButton",

  data:() =>({
    prevRoute: null,
    backButtonIcon: mdiArrowLeft
  }),

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },

  methods:{
    goBack() {
      if (this.prevRoute == null){
        this.$router.push('/')
      } else{
        if(this.prevRoute.path === '/share')
        {
          this.$router.push('/')
        }
        else {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
