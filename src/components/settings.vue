<template>
  <v-container>
    <br>
    <h4>{{ $t('settings.selectTheme') }}</h4>
  <div class="text-center">
    <v-select
        id="select"
        v-model="select"
        item-text="title"
        return-object
        single-line
        :label="select.title"
        color="var(--dark-color)">
    </v-select>
    <v-btn @click="updateTheme(select.title);refresh();">{{ $t('settings.applyBtn') }}</v-btn>
  </div>
  </v-container>
</template>



<script>
import languageSwitch from "@/components/languageSwitch";
import i18n from '../i18n.js';

export default {
  name: "settings",
  components: {
    languageSwitch,
  },
  data() {
    var language = 'en';
    return {
      select: {title: null},
      items: [
        {title: i18n.t('settings.summer', language)},
        {title: i18n.t('settings.fall', language)},
        {title: i18n.t('settings.winter', language)},
        {title: i18n.t('settings.spring', language)},
        {title: i18n.t('settings.seasons', language)}
      ]
    }
  },

  methods: {
    updateTheme(season) {
      this.$store.commit("changeTheme", season);
      this.updateLanguage();
    },
    refresh() {
      this.$router.back();
    },
    updateLanguage(){
      this.language = this.$store.getters.getLanguage;
    }
  },

  mounted() {
    this.select.title = this.$store.getters.getTheme;
    this.updateLanguage();
  }
}
</script>

<style scoped>
#select {
  width: 80vw;
  max-width: 500px;
}
</style>

