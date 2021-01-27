<template>
  <v-container>
    <br>
    <v-row justify="center"> <languageSwitch /> </v-row>
    <br>
    <h4>{{ $t('settings.selectTheme') }}</h4>
  <div class="text-center">
    <v-select
        id="select"
        v-model="select"
        item-text="title"
        :items="items"
        return-object
        single-line
        :label="select.title"
        color="var(--dark-color)">
    </v-select>
    <v-btn @click="updateTheme(select.title);refresh();">{{ $t('settings.applyBtn') }}</v-btn>
  </div>
    <br>
    <h4> {{ $t('settings.reminderChange') }} </h4>
      <v-btn-toggle
          v-model="toggle_multiple"
          multiple
          group
          borderless
          outlined
          class="daybuttons"
      >
        <v-btn
            value="1"
            elevation="2"
            class="btn"
        >
          {{ $t('days.mo') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="2"
            class="btn"
        >
          {{ $t('days.tu') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="3"
            class="btn"
        >
          {{ $t('days.we') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="4"
            class="btn"
        >
          {{ $t('days.th') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="5"
            class="btn"
        >
          {{ $t('days.fr') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="6"
            class="btn"
        >
          {{ $t('days.sa') }}
        </v-btn>
        <v-btn
            elevation="2"
            value="7"
            class="btn"
        >
          {{ $t('days.su') }}
        </v-btn>
      </v-btn-toggle>
    <br>
    <div class="apply">
      <v-btn @click="updateReminder">{{ $t('settings.applyBtn') }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import languageSwitch from "@/components/languageSwitch";

export default {
  name: "settings",

  metaInfo:{
    title: "Settings",
  },

  components: {
    languageSwitch,
  },

  data: () => ({
      select: {title: null},
      items: [
        {title: "Summer"},
        {title: "Winter"},
        {title: "Fall"},
        {title: "Spring"},
        {title: "Seasons"}
      ],
      toggle_multiple: []
  }),
  methods: {
    updateTheme(season) {
      this.$store.commit("changeTheme", season);
    },
    updateReminder() {
      this.$store.dispatch("updateReminder", this.toggle_multiple);
    },
    refresh() {
      this.$router.back();
    },
  },

  mounted() {
    this.select.title = this.$store.getters.getTheme;
  }
}
</script>

<style scoped>
#select {
  width: 80vw;
  max-width: 500px;
}
.daybuttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  max-width: 300px;
}

.apply {
  display: flex;
  justify-content: center;
}
</style>