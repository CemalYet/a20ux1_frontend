<template>
  <div class="ma-4" style="text-align: center">
    <v-progress-circular
        indeterminate
        size="56"
        color= var(--dark-color)
    >
    </v-progress-circular>
    <div class="text-body-1 ma-2">Loading... Please wait.</div>
  </div>
</template>

<script>
export default {
  name: "loader"
}
</script>