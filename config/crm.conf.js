import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { cwd } from 'node:process';

export default defineConfig(({ command, mode }) => {
    const ENV = loadEnv(command === 'serve' ? 'development' : 'produection', cwd());
    return {
        name: 'crm',
        base: '/',
        plugins: [react({})],
        resolve: {
            alias: {
                '@': resolve(cwd(), 'src'),
            },
        },
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                },
            },
            emptyOutDir: true,
        },
        esbuild: {
            supported: {
                'top-level-await': true,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `$vite-app-cdn:"${ENV.VITE_APP_CDN}";`,
                },
            },
        },
        server: {
            host: '0.0.0.0',
            proxy: {
                '/proxy': {
                    target: ENV.VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/proxy', ''),
                },
            },
        },
    };
});
