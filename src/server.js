import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';

const http = express();
// http.get('/', (req, res) => {
//     console.log(req.url);
//     res.send('进入页面');
// });
http.set('');
http.use('/testapi', (req, res) => {
    console.log(req.url, '获取数据');
    res.removeHeader('X-Powered-By');
    res.set('Cache-Control', 'no-store');
    res.removeHeader('ETag');
    res.send({ data: { a: 90 } });
});
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
http.listen(8010, () => {
    console.log('服务器已经启动');
});
