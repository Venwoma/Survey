import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../App';
export default function render(url) {
    const html = renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>,
    );
    return { html };
}
