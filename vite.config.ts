import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Zibano',
        short_name: 'Zibano',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff69b4',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
