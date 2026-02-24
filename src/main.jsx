import { createRoot } from 'react-dom/client';
import './assets/css/common/index.scss';
import AppRouter from './routes/AppRouter.jsx';
import '@ant-design/v5-patch-for-react-19';

globalThis.cls = (text, value, { fc = '#35495e', sc = '#41b883' } = {}) => {
    console.log(`%c${text} %c${value}ms`, `background: ${fc}; color: white; padding: 2px;`, `background:  ${sc}; color: white; padding: 2px;`);
};

createRoot(document.getElementById('root')).render(
    //   <StrictMode>
    <AppRouter />,
    // </BrowserRouter>
);
