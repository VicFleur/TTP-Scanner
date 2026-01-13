// plugins/directus.ts
import { createDirectus, rest, realtime, staticToken, authentication } from '@directus/sdk';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const directus = createDirectus(config.public.directus.url)
        .with(rest())
        .with(realtime())
        .with(authentication())
        .with(staticToken(config.public.directus.token))

    return {
        provide: {
            directus,
        },
    };
});