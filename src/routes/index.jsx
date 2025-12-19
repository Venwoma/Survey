// 暂时设计路由配置规则 spa+ssr
import { useFastExtend } from '@kyol/usejs';
import { Outlet } from 'react-router-dom';
import { Fragment, lazy } from 'react';
import { addNotFound } from './route-hooks';
// eslint-disable-next-line react-hooks/rules-of-hooks
useFastExtend();
const files = import.meta.glob('../pages/**/*.{jsx,js}', {
    // eager: true,
    // import: 'default',
});
const ModuleFile = import.meta.glob('../pages/**/*.{jsx,js}', {
    eager: true,
    // import: 'default',
});
export const routes = Object.map(files, (V, k) => {
    let path = k.replace(/(\.\.\/pages|\.jsx)/g, '');
    let isSSR = false;
    if (path.includes('_')) {
        path = path.replaceAll('_', ':');
    }
    if (path.includes('$')) {
        path = path.replaceAll('$', '');
        isSSR = true;
    }
    const LazyElement = lazy(V);
    const route = {
        nodeList: path.split('/').filter(Boolean),
        path: path.toLowerCase(),
        element: <LazyElement></LazyElement>,
        children: [],
        elementName: V.name,
        isSSR: isSSR,
        loader: ModuleFile[k].loader,
        errorElement: <div>这是错误都</div>,
    };
    return route;
});

!import.meta.env.PROD && console.log('routes=>', routes);
const routeMiddleware = async (routes, ...funcs) => {
    for await (const func of funcs) {
        await func(routes);
    }
};
async function buildTree(routes, tree = []) {
    await routeMiddleware(routes, addNotFound);
    console.log(routes);
    routes.forEach((route, indexRoute) => {
        let parentNode = null;
        let parentChildren = tree;
        const { path, ...surplus } = route;
        const routeNode = surplus;
        if (route.nodeList) {
            route.nodeList.forEach((path, ndIndex) => {
                const isLast = route.nodeList.length - 1 === ndIndex;
                const keyPath = `${!ndIndex ? '/' : ''}${path}`;
                const node = parentChildren.find((n) => n.path === keyPath);
                if (node) {
                    parentNode = node;
                    parentChildren = node.children = node.children || [];
                } else {
                    const _node = { path: keyPath };
                    parentChildren.push(_node);
                    if (isLast) {
                        Object.assign(_node, surplus);
                        // 如果是最后一个
                        if (path === 'index') {
                            // 如果是index 需要默认展示 设置属性
                            Reflect.deleteProperty(_node, 'path');
                            Reflect.deleteProperty(_node, 'children');
                            _node.index = true;
                        }
                    } else {
                        // 如果不是最后一个
                        parentChildren = _node.children = _node.children || [];
                        _node.element = (
                            <Fragment>
                                <Outlet></Outlet>
                            </Fragment>
                        );
                        _node.elementName = 'Fragment';
                    }
                }
            });
        } else {
            tree.push(route);
        }
    });
    return tree;
}
const FRoutes = await buildTree(routes);
export default FRoutes;
