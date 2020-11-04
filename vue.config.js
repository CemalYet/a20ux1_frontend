module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',
  outputDir: '../a20ux1/',
  assetsDir: 'public',

  pages: {
    'index':{
      // entry for the page
      entry: './src/pages/index/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'app/Views/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'feed':{
      // entry for the page
      entry: './src/pages/feed/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'app/Views/feed.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Feed page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'feed']
    },
    'reglog':{
      // entry for the page
      entry: './src/pages/reglog/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'app/Views/reglog.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'reglog page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'reglog']
    }
  }

}