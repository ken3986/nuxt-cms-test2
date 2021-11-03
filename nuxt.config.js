import { client, blogConfig } from './utils/microcms';
const { API_KEY, SERVICE_DOMAIN } = process.env


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-microcms-blog',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    'nuxt-microcms-module',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

  microcms: {
    options: {
      serviceDomain: SERVICE_DOMAIN,
      apiKey: API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  generate: {
    interval: 100,
    async routes() {
      const limit = 50;

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return client
          .get({
            endpoint: 'blog',
            queries: {
              offset,
              limit,
              depth: 2,
            },
          })
          .then(async (res) => {
            let articles = [];
            if (res.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.contents.map((content) => ({
                route: `/${content.id}`,
                // payload: { content, popularArticles, banner },
                payload: { content },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      return [
        ...articles,
      ];
    },
    dir: 'dist',
  },

}
