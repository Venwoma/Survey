import { createRoot } from 'react-dom/client';
import './assets/css/common/index.scss';
import AppRouter from './routes/AppRouter.jsx';
import '@ant-design/v5-patch-for-react-19';
createRoot(document.getElementById('root')).render(
    //   <StrictMode>
    <AppRouter />
    // </BrowserRouter>
);
