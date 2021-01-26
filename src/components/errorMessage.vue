<template>
      <div class="error_container">
        <v-icon
            size="100"
            color=var(--light-color)>
          mdi-robot-confused-outline
        </v-icon>
        <div class="text-h2"> Woops...</div>
        <div class="text-subtitle-1">Something went wrong connection to the server.</div>
      </div>
</template>

<script>
export default {
  name: "errorMessage"
}
</script>

<style scoped>

.error_container{
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>