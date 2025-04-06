// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: [
      'bootstrap/dist/css/bootstrap.min.css',
      'bootstrap-icons/font/bootstrap-icons.min.css',
      '~/assets/css/main.css'
    ],
    nitro: {
        experimental: {
            websocket: true
        }
    },

    plugins: [

    ],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: "Hits Counter | Website Visit Tracker With an Image",
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                {
                    name: 'google-site-verification',
                    content: 'DZAz-h1AemdJo4_S2hJddtHRNkapwEd1dTYW-R7N018'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/Icon-1.png' },
            ]
        }
    }
})