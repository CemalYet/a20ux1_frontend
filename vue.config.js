module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',

  outputDir: '../a20ux1/',
  assetsDir: 'public',
  indexPath: 'app/Views/index.php',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
