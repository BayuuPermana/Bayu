import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'fs'
import path from 'path'

// Small utility to get the blog slugs for the sitemap
const postsDir = path.resolve(__dirname, 'posts')
let dynamicRoutes: string[] = []
if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir)
    dynamicRoutes = files
        .filter(f => f.endsWith('.md'))
        .map(f => `/blog/${f.replace('.md', '')}`)
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
        react(),
        tailwindcss(),
        Sitemap({
            hostname: 'https://bayuupermana.github.io/Bayu',
            dynamicRoutes,
            outDir: 'dist',
        })
    ],
    resolve: {
        alias: {
            'react-router-dom/server.js': 'react-router-dom/server'
        }
    },
    base: command === 'serve' ? '/' : '/Bayu/',
    ssr: {
        noExternal: ['react-syntax-highlighter']
    },
    // @ts-ignore
    ssgOptions: {
        beastiesOptions: {
            preload: 'media',
        },
    }
}))
