import '@/assets/css/admin/index.scss';
import { Outlet } from 'react-router-dom';
import { commonStore } from '@/store/index.jsx';
import { clsx } from 'clsx';
import LeftMenu from '../compoments/admin/leftMenu';
export default function Admin() {
    const [showAdminLeft, set] = commonStore.useState((state) => {
        return state.showAdminLeft;
    });

    const messageApi = commonStore((state) => state.messageApi);
    const test = () => {
        messageApi.info(showAdminLeft ? '折叠左边栏' : '展开左边栏');
        set(() => ({ showAdminLeft: !showAdminLeft }));
    };
    return (
        <div className="page-admin flex">
            <div className={clsx('admin-left', showAdminLeft && 'show-left')}>
                <LeftMenu></LeftMenu>

               


                <div className="collapsed-button" onClick={() => test()}>
                    {showAdminLeft ? '<' : '>'}
                </div>
            </div>
            <div className="admin-right">
                <Outlet></Outlet>
            </div>
        </div>
    );
}
