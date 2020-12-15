<template>
  <v-app>
    <v-main id="main">
      <div style="padding-bottom: 58px">
        <v-icon
            size="100"
            color=var(--light-color)>
          mdi-robot-confused-outline
        </v-icon>
        <div class="text-h2"> Woops...</div>
        <div class="text-subtitle-1">Something went wrong connection to the server.</div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "errorMessage"
}
</script>

<style scoped>

#main{
  text-align: center;
  align-items: center;
  height: 100vh;
}

</style>