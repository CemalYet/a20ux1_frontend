
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
    }
  },
  chainWebpack: config => {
    config.plugin('brotli-compression')
    config.plugin('gzip-compression')
  }
}