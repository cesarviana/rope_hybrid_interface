import path from 'path'
import fs from 'fs'

const prettyName = 'RoPE Blocks'
const productionSubfolder = '/rope/'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: prettyName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', href: '/rope.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/rope/index.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    },
    port: 8000,
    host: '0.0.0.0'
  },

  pwa: {
    manifest: {
      name: prettyName,
      short_name: prettyName,
      start_url: `${productionSubfolder}index.html`,
      lang: 'pt',
      background_color: "#f2f2f2",
      display: "fullscreen",
      orientation: "landscape",
      theme_color: "#e6c090"
    },
    meta: {
      nativeUI: true
    },
    workbox: {
      cacheNames: {
        prefix: process.env.npm_package_name,
        suffix: process.env.npm_package_version
      },
      clientsClaim: true
    }
  },

  router: {
    base: process.env.NODE_ENV === 'development' ? '/' : `${productionSubfolder}`
  },

  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(flac|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
