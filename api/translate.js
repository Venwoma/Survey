import md5 from 'md5';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { texts, target } = req.body;

    const appid = process.env.BAIDU_APPID;
    const secretKey = process.env.BAIDU_SECRET_KEY;

    const cache = new Map();

    if (cache.has(query)) {
        return res.json({ translations: cache.get(query) });
    }

    cache.set(query, translations);

    try {
        const query = texts.join('\n');
        const salt = Date.now();
        const sign = md5(appid + query + salt + secretKey);

        const response = await fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate`, {
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
        console.log('Baidu API 返回：', data); // 🔥 打印返回内容
        if (!data.trans_result) {
            return res.status(500).json({ error: 'Baidu API failed', detail: data });
        }

        const translations = data.trans_result.map((item) => item.dst);

        res.status(200).json({ translations });
    } catch (error) {
        res.status(500).json({ error: 'Translation failed' });
    }
}
