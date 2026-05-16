import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Abhirami Hotel QuickRes',
        short_name: 'QuickRes',
        description: 'Order food from your table with QR code scanning',
        theme_color: '#B5451B',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/table/1',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173
  },
  preview: {
    host: '0.0.0.0', // Listen on all interfaces for preview
    port: 5173
  }
})