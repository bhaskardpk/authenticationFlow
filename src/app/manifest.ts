import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SNOPT',
        short_name: 'SNOPT',
        description: 'The platform serving the sport industry',
        start_url: '/',
        display: 'standalone',
        background_color: '#110F1A',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}