import NotFound from '../pages/404';
export const addNotFound = (routes) => {
    routes.push({
        path: '*',
        element: <NotFound />,
    });
};
