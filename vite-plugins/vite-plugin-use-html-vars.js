export default (options) => {
    return {
        name: 'use-html-vars',
        transform(code, idPath) {
            console.log(idPath);
            if (idPath.endsWith('index.html')) {
                return Object.keys(options).reduce((h, key) => h.replace(`$${key}$`, options[key]), code);
            }
        },
        transformIndexHtml(html) {
            html = html.replace('<head>', '<head id="kjije">');
            return Object.keys(options).reduce((h, key) => h.replace(`$${key}$`, options[key]), html);
        },
        render: (html) => {
            console.log('render ssr渲染服务端开启了');
            return html;
        },
    };
};
