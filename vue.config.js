
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',
  outputDir: '../a20ux1/app/Views/',
  assetsDir: '../../public',
  indexPath: 'index.html',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    webpackBundleAnalyzer: {
      openAnalyzer: true
    },
    compression:{
      brotli: {
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          level: 11,
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    },
  },
  chainWebpack: config => {
    config.plugin('brotli-compression')
    config.plugin('gzip-compression')


    /*
       Disable (or customize) prefetch, see:
       https://cli.vuejs.org/guide/html-and-static-assets.html#prefetch

    config.plugins.delete('prefetch')


       Configure preload to load all chunks
       NOTE: use `allChunks` instead of `all` (deprecated)

    config.plugin('preload').tap((options) => {
      options[0].include = 'allChunks'
      return options
    })

     */
  },
}
