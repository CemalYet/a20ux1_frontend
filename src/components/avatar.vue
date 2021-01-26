<template>
  <v-avatar :size="this.size" color="var(--dark-color)" style="margin: auto 10px auto auto">
    <span v-if="this.picture === null"
          class="white--text"
          :style="{fontSize: this.size/2 + 'px'}"
    >
      {{ this.userName.split(" ").map((n) => n[0]).join("").substring(0,2) }}
    </span>
    <v-img v-else :src="this.picture"></v-img>
  </v-avatar>
</template>

<script>
export default {
  name: "avatar",

  props: {
    picture: Object,
    userName: String,
    size: Number,
  },
}
</script>
