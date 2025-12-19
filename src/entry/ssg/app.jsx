import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

export default function Layout() {
    const [state, setState] = useState(false);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>head test {state ? 'A' : 'B'}</title>
                <body className={`body-class-in-head-${state ? 'a' : 'b'}`} />
            </Head>
            <Suspense>
                <Outlet />
            </Suspense>
        </>
    );
}
