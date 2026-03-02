import express from 'express';
import md5 from 'md5';
import fetch from 'node-fetch';
import { resolve } from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config({ path: resolve('../.env.local') });

const app = express();
app.use(bodyParser.json());

// 打印环境变量，确认加载
console.log('BAIDU_APPID:', process.env.BAIDU_APPID);
console.log('BAIDU_SECRET_KEY:', process.env.BAIDU_SECRET_KEY);

// 挂载 /api/translate
app.post('/api/translate', async (req, res) => {
    const { texts, target } = req.body;
    const appid = process.env.BAIDU_APPID;
    const secretKey = process.env.BAIDU_SECRET_KEY;

    if (!appid || !secretKey) return res.status(500).json({ error: 'API key not set' });

    try {
        const query = texts.join('\n');
        const salt = Date.now();
        const sign = md5(appid + query + salt + secretKey);

        const response = await fetch('https://fanyi-api.baidu.com/api/trans/vip/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                q: query,
                from: 'auto',
                to: target === 'zh-CN' ? 'zh' : 'en',
                appid,
                salt,
                sign,
            }),
        });

        const data = await response.json();
        if (!data.trans_result) return res.status(500).json({ error: 'Baidu API failed', detail: data });

        const translations = data.trans_result.map((item) => item.dst);
        res.status(200).json({ translations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Translation failed', detail: err.message });
    }
});

// 测试根路由
app.get('/', (req, res) => res.send('Node API running'));

// 启动服务器
app.listen(8010, () => console.log('Node API running on http://localhost:8010'));
// // 生成 vite 的中间件函数
// const vite = await createViteServer({
//     server: { middlewareMode: true },
// });

// http.use(vite.middlewares);

// // 正常逻辑
// http.use('*', async (req, res) => {
//
//     const url = req.originalUrl;
//
//     const template = vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));

//
//     const { render } = vite.ssrLoadModule('./entry/server.jsx');
//     const { html } = render(url);
//     const response = template.replace('<!--ssr-outlet-->', html);

//     res.status(200).set({ 'Content-Type': 'text/html' }).end(response);
// });
