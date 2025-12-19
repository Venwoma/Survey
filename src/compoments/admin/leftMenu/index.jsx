import { Tooltip } from 'antd';
import menu from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { commonStore } from '@/store/index.jsx';
export default function LeftMenu() {
    const navigate = useNavigate();
    const buttonList = [
        { key: 'surveys', name: 'Surveys', icon: '', route: '/admin' },
        { key: 'analytics', name: 'Analytics', icon: '', route: '/admin/analyses' },
        { key: 'instalation', name: 'Instalation', icon: '', route: '/user-center/instalation' },
        { key: 'setting', name: 'Setting', icon: '', route: '/' },
        {
            key: 'create',
            name: '',
            icon: '',
            class: 'createButton',
            route: '/admin/create',
        },
    ];
    const [showAdminLeft, set] = commonStore.useState((state) => {
        return state.showAdminLeft;
    });

    const handleClickButton = (button) => {
        console.log('menu', button);
        navigate(button.route);
    };

    return (
        <div className={menu.menuBox}>
            <div className={menu.logo}></div>
            <div className={menu.buttonGroup}>
                {buttonList.map((button) => (
                    <Tooltip key={button.key} placement="right" title={showAdminLeft ? null : button.name}>
                        <div
                            className={button.class ? `${menu[button.class]}` : `${menu.button} ${!showAdminLeft && menu.collapsedButton}`}
                            onClick={() => handleClickButton(button)}
                        >
                            <div className={menu.buttonIcon}></div>
                            <span className={menu.buttonName}>{button.name}</span>
                        </div>
                    </Tooltip>
                ))}
            </div>
            <div className={menu.userInfo}>
                <div className={menu.avatar}></div>
                <div className={menu.userName}>Judy</div>
            </div>
        </div>
    );
}
