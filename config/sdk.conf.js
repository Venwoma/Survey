import { resolve } from 'path';
const projectName = 'Zap';
export default {
    build: {
        outDir: 'dist-zap',
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, './zap-sdk/index.js'),
            name: `${projectName}SDK`,
            formats: ['iife'],
            fileName: () => `${projectName.toLowerCase}.min.js`,
        },
        target: 'es2015',
    },
};
