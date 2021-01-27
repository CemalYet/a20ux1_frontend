<template>
      <div class="error_container">
        <v-icon
            size="100"
            color=var(--light-color)>
          {{ mdiRobotConfusedOutline }}
        </v-icon>
        <div class="text-h2"> Woops...</div>
        <div class="text-subtitle-1">{{ $t('errorMessages.message') }}.</div>
      </div>
</template>

<script>
import {mdiRobotConfusedOutline} from '@mdi/js';
export default {
  name: "errorMessage",

  data:()=>({
    mdiRobotConfusedOutline: mdiRobotConfusedOutline
  })
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