export default defineNuxtConfig({

    runtimeConfig: {
        directus: {
            url: process.env.DIRECTUS_URL,
            token: process.env.DIRECTUS_TOKEN
        },
        public: {
            api: process.env.DIRECTUS_URL,
            directus: {
                url: process.env.DIRECTUS_URL,
                token: process.env.DIRECTUS_TOKEN
            }
        }
    },

    modules: [
        'nuxt-directus',
        '@nuxt/fonts',
        '@vueuse/nuxt',
    ],

    compatibilityDate: "2025-12-27",

    css: [
        '@/assets/scss/main.scss',
        '@/assets/scss/fonts.scss',
        '@/assets/scss/general/body.scss',
        '@/assets/scss/general/overrides.scss',
    ],
    fonts: {
        defaults: {
            weights: [400, 600, 700, 800],
            styles: ['italic', 'normal']
        },
        families: [
            { name: 'Switzer', provider: 'fontshare' },
        ]
    },

    directus: {
        url: process.env.DIRECTUS_URL,
        autoFetch: false,
        autoRefresh: true,
        fetchUserParams: {
            fields: [
                'id',
                'first_name',
                'last_name',
                'email',
                'role',
                'policies.policy',
            ]
        }
    },

    build: {
        transpile: ['naive-ui', 'vueuc', '@css-render/vue3-ssr']
    },
    nitro: {
        preset: 'bun',
        compressPublicAssets: true
    },
    vite: {
        server: {
            allowedHosts: ['3000.upclose.dev', 'scanner.turismotorino.local']
        }
    },
    sourcemap: {
        server: true,
        client: true,
    },
    experimental: {
        appManifest: false,
        entryImportMap: false
    },
    devtools: {
        enabled: false
    }
})