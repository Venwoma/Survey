import { Tooltip,Button } from 'antd';
import menu from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { commonStore } from '@/store/index.jsx';
import { SettingOne, System,InboxIn,PlusCross,User,ShoppingBagOne  } from '@icon-park/react';
import logoImg from '@/assets/images/logo.png';

export default function LeftMenu() {
    const navigate = useNavigate();
    const buttonList = [
        { key: 'surveys', name: 'Surveys',  icon: <System theme="outline" size="30" fill="#333"/>, route: '/admin' },
        { key: 'instalation', name: 'Instalation', icon: <InboxIn theme="outline" size="30" fill="#333"/>, route: '/user-center/instalation' },
        { key: 'setting', name: 'Setting', icon:  <SettingOne theme="outline" size="30" />, route: '/' },
        { key: 'plan&billing', name: 'Plan & Billing', icon:  <ShoppingBagOne theme="outline" size="30" fill="#333"/>, route: '/' },
        {
            key: 'create',
            name: '',
            icon: <PlusCross theme="filled" size="16" fill="white" className="icon" / >,
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
            <div className={menu.logo}>
                <img src={logoImg} alt="logo" />
            </div>
            <div className={menu.buttonGroup}>
                {buttonList.map((button) => (
                    <Tooltip key={button.key} placement="right" title={showAdminLeft ? null : button.name}>
                        <div
                            className={button.class ? `${menu[button.class]}` : `${menu.button} ${!showAdminLeft && menu.collapsedButton}`}
                            onClick={() => handleClickButton(button)}
                        >
                            <div className={menu.buttonIcon}>{button.icon}</div>
                            <span className={menu.buttonName}>{button.name}</span>
                        </div>
                    </Tooltip>
                ))}
            </div>
            <div className={menu.userInfo}>
                <div className={menu.avatar}>
                    <User theme="outline" size="40" fill="#33333369"/>
                </div>
                {showAdminLeft && (
                <div className={menu.userBase}>
                    <div className={menu.userName}>Judy</div>
                    <div className={menu.userCount}>12 Projects</div>
                </div>
                )}
            </div>
            {showAdminLeft && (
            <div className={menu.userAction}>
                <Button
                    type="primary"
                    block
                    onClick={() => navigate('/profile')}
                >
                    Manage Plan
                </Button>
            </div>
            )}
        </div>
    );
}
