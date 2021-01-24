<template>
  <div>
        <div>
            <v-btn v-for="entry in languages" :key="entry.title" @click.native="changeLocale(entry.language)">
                <flag class="flagImg" :iso="entry.flag" v-bind:squared=false /> {{entry.title}}
            </v-btn>
        </div>
  </div>
</template>

<script>
export default {
  name: 'languageSwitch',
  data() {
    return { 
        languages: [
            { flag: 'us', language: 'en', title: 'English' },
            { flag: 'nl', language: 'nl', title: 'Dutch' }
        ]
    }
  },
    methods: {
        changeLocale(locale) {
            this.$i18n.locale = locale;
            this.$store.dispatch('updateLanguage', locale);
            location.reload()
        }   
    }
}
</script>

<style>
.flagImg {
        margin-right: 1rem;
    }
</style>