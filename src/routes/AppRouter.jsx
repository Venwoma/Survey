import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';
// 下面这个是老的用法;
import FRoutes from './index.jsx';
import Layout from '../compoments/layout/index.jsx';

const basename = process.env.REACT_APP_BASENAME || '/';
const router = createBrowserRouter(FRoutes, { basename });
export default function App() {
    // const Router = useRoutes(FRoutes);
    return (
        <Suspense fallback={<Spin spinning className="full-loading"></Spin>}>
            <RouterProvider router={router}></RouterProvider>
            <Layout></Layout>
        </Suspense>
    );
}
