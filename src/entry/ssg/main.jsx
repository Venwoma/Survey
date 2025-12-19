import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.jsx';
import '@ant-design/v5-patch-for-react-19';
export const createRoot = ViteReactSSG(
    // react-router-dom data routes
    { routes },
    // function to have custom setups
    ({ routes: routers, isClient, initialState, routePath, ...op }) => {
        // router.createHref('/admin');
        // do something.
        console.log('start', op, routers, initialState, isClient, routePath, 'appppp');
        initialState.useDateee = { 1: 3, soke: 900 };
    }
);
