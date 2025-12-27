import type { DirectusThumbnailOptions } from "nuxt-directus/dist/runtime/types"

export const useImages = () => {
    const directusUrl = useDirectusUrl()

    const getDirectusThumbnail = (
        fileId: string,
        options?: DirectusThumbnailOptions
    ): string => {
        const url = new URL(`${directusUrl}/assets/${fileId}`)
        if (options) {
            if (options.width) { url.searchParams.append('width', options.width.toFixed(0)) }
            if (options.height) { url.searchParams.append('height', options.height.toFixed(0)) }
            if (options.quality) { url.searchParams.append('quality', options.quality.toFixed(0)) }
            if (options.withoutEnlargement) { url.searchParams.append('withoutEnlargement', 'true') }
            if (options.fit) { url.searchParams.append('fit', options.fit) }
            if (options.format) { url.searchParams.append('format', options.format) }
            if (options.key) { url.searchParams.append('key', options.key) }
        }
        return url.href
    }

    return { getDirectusThumbnail }
}