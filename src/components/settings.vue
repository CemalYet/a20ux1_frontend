<template>
  <div class="text-center">
    <br>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color=var(--main-color)
            dark
            v-bind="attrs"
            v-on="on"
        >
          {{ $t('buttons.changeTh') }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
        >
          <v-list-item-title @click="updateTheme(item.title)">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn @click="refresh">{{ $t('buttons.apply') }}</v-btn>
  </div>
</template>

<script>
export default {
name: "settings",

  data: () => ({
    items: [
      { title: 'Summer' },
      { title: 'Fall' },
      { title: 'Winter' },
      { title: 'Spring' },
      { title: 'Seasons' },
    ],
  }),

  methods: {
    updateTheme(season) {
      this.$store.commit("changeTheme", season);
    },
    refresh() {
      this.$router.back();
    },
  }
}
</script>

<style scoped>

</style>