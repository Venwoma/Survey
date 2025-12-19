import { Suspense, useEffect } from 'react';
import commonStore from '../../store/hooks';

export default function TestComponent({ value }) {
    useEffect(() => {}, [value]);
    const isLogin = commonStore((state) => state.isLogin);
    return (
        <div>
            {TestComponent.name} {isLogin}
        </div>
    );
}
