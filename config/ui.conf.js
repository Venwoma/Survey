import { resolve } from 'path';
export default {
    build: {
        emptyOutDir: true,
        outDir: 'dist-ui',
        lib: {
            entry: resolve(__dirname, '../zap-sdk/zap-ui/index.js'),
            name: 'ZapUI',
            formats: ['iife'],
            fileName: () => 'zapui.min.js',
        },
        target: 'es2015',
    },
    css: {
        postcss: false,
    },
};
