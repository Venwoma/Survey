import Layout from './app';
import '../../assets/css/common/index.scss';
import Index from '../../pages/index';
import Admin from '../../pages/admin';
import UserCenterIndex from '../../pages/user-center';
console.log('UserCenterIndex组件：', UserCenterIndex); 

export const routes = [
    {
        path: '/',
        element: <Layout />,
        // entry: 'src/Layout.tsx',
        // entry: 'src/entry/ssg/app.jsx',
        // lazy: () => import('./app'),
        // Component: Layout,
        children: [
            {
                index: true,
                element: <Index></Index>,
                //Component: Index, //React.lazy(() => import('../../pages/index')),
                // lazy: async () => {
                //     return {
                //         Component: await import('../../pages/index').default,
                //     };
                // },
                meta: {
                    title: '你是谁',
                },
            },
            {
                path: 'admin',
                element: <Admin></Admin>,
                // Component: Admin, //|| React.lazy(() => import('../../pages/admin')),
                meta: {
                    title: '你是谁',
                },
            },
            { 
                path: 'user-center', // 路由路径：/user-center
                element: <UserCenterIndex></UserCenterIndex> // 挂载你的用户中心组件
            }
        ],
    },
];
