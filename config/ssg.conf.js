import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { cwd } from 'node:process';
export default defineConfig(({ command, mode }) => {
    const ENV = loadEnv(command === 'serve' ? 'development' : 'production', cwd());
    return {
        name: 'ssg',
        base: '/',
        plugins: [react({})],
        resolve: {
            alias: {
                '@': resolve(cwd(), 'src'),
            },
        },
        ssgOptions: {
            htmlEntry: '/src/entry/ssg/index.html',
            includedRoutes() {
                return ['/', '/login'];
            },
            onBeforePageRender(route, renderedHTML, appCtx) {
                console.log(route, 'route');
                console.log('这是生成前');
            },
        },
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: `static-ssg/[ext]/[name].[ext]`,
                    chunkFileNames: (info) => {
                        if (info.name === 'index') {
                            return 'static-ssg/js/css-in-js.index.[hash:8].js';
                        }
                        return 'static-ssg/js/[name].js';
                    },
                    entryFileNames: 'static-ssg/js/zap-min.[hash].js',
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
