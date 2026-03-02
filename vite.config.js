import { defineConfig, loadEnv } from 'vite';
import vitePluginUseHtmlVars from './vite-plugins/vite-plugin-use-html-vars.js';
import { cwd } from 'process';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(async ({ command, mode }) => {
    const ENV = loadEnv(command === 'serve' ? 'development' : 'production', cwd());

    const isSDK = mode === 'sdk';
    const isSSG = mode === 'ssg';
    const configType = ['sdk', 'ui', 'ssg'].includes(mode) ? mode : 'crm';

    let buildConf = await import(`./config/${configType}.conf.js`).then((res) =>
        typeof res.default === 'function' ? res.default({ command, mode }) : res.default,
    );

    console.log('vite-config.js=>', isSSG);

    // 保留或初始化插件
    buildConf.plugins = buildConf.plugins || [];

    buildConf.plugins.unshift(
        vitePluginUseHtmlVars({
            src: isSDK ? '/zap-sdk/index.js' : '/src/main.jsx',
            content: isSDK
                ? `<div><input class="input" type="text" value="" /></div>
                <div style="display: flex; gap: 20px">
                    <div class="production" style="flex: 0.3; border: 1px red solid; height: 50px"></div>
                    <div class="production" style="flex: 0.3; border: 1px red solid; height: 50px"></div>
                    <div class="production" style="flex: 0.3; border: 1px red solid; height: 50px"></div>
                </div>`
                : '',
        }),
    );

    // 定义全局变量
    buildConf.define = {
        ...(buildConf.define || {}),
        VITE_APP_CDN: JSON.stringify(ENV.VITE_APP_CDN),
        VITE_APP_SDK_URL: JSON.stringify(ENV.VITE_APP_SDK_URL),
    };

    // Vite dev server 代理
    buildConf.server = {
        ...(buildConf.server || {}),
        proxy: {
            '/api/translate': 'http://localhost:8010',
            // 其他 API
        },
    };

    return buildConf;
});
