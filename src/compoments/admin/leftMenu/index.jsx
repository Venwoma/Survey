import { Tooltip, Popover, Button } from 'antd';
import menu from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { commonStore } from '@/store/index.jsx';
import { SettingOne, System, InboxIn, PlusCross, User, ShoppingBagOne } from '@icon-park/react';
import logoImg from '@/assets/images/logo-img.png';
import logoName from '@/assets/images/logo-name.png';
import { clsx } from 'clsx';
export default function LeftMenu() {
    const navigate = useNavigate();
    const buttonList = [
        { key: 'surveys', name: 'Surveys', icon: <System theme="outline" size="30" fill="#333" />, route: '/admin' },
        { key: 'instalation', name: 'Instalation', icon: <InboxIn theme="outline" size="30" fill="#333" />, route: '/user-center/instalation' },
        { key: 'setting', name: 'Setting', icon: <SettingOne theme="outline" size="30" />, route: '/user-center/project-setting' },
        { key: 'plan&billing', name: 'Plan & Billing', icon: <ShoppingBagOne theme="outline" size="30" fill="#333" />, route: '/user-center/plan-billing' },
        {
            key: 'create',
            name: '',
            icon: <PlusCross theme="filled" size="16" fill="white" className={menu.icon} />,
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
                <img src={logoImg} alt="logo" className={`${menu.logoImg} ${!showAdminLeft && menu.logoImgCollapsed}`} />
                {showAdminLeft && <img src={logoName} alt="logoname" className={menu.logoName} />}
            </div>

            <div className={menu.buttonGroup}>
                {buttonList.map((button) => (
                    <Tooltip key={button.key} placement="right" title={showAdminLeft ? null : button.name}>
                        <div
                            className={clsx(
                                menu['nav-button'],
                                `nav-button-${button.key}`,
                                button.class ? `${menu[button.class]}` : `${menu.button}`,
                                !showAdminLeft && button.key !== 'create' && menu.collapsedButton
                            )}
                            onClick={() => handleClickButton(button)}
                        >
                            <div className={menu.buttonIcon}>{button.icon}</div>
                            <span className={menu.buttonName}>{button.name}</span>
                        </div>
                    </Tooltip>
                ))}
            </div>

            <div className={menu.userInfo}>
                <Popover
                    placement="right"
                    title={
                        !showAdminLeft ? (
                            <div className={menu.tip}>
                                <div className={menu.tipUser}>
                                    <User theme="outline" size="20" fill="#33333379" className={menu.tipIcon} />
                                    <div>
                                        <div className={menu.tipUserName}>User_google_7684</div>
                                        <div className={menu.tipPlan}>
                                            <span>Free Plan</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={menu.tipOptions}>
                                    <div>
                                        <Button className={menu.buttons} onClick={() => navigate('/user-center')}>
                                            Account
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className={menu.buttons} onClick={() => navigate('/user-center/plan-billing')}>
                                            Plan&billing
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className={menu.buttons} onClick={() => navigate('/admin')}>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                >
                    <div className={`${menu.avatar} ${!showAdminLeft && menu.avatarCollapsed}`}>
                        <User theme="outline" size="40" fill="#33333369" />
                    </div>
                </Popover>

                <div className={`${menu.userBase} ${!showAdminLeft && menu.collapsedUse}`}>
                    <div className={menu.userName}>Judy</div>
                    <div className={menu.userCount}>12 Projects</div>
                </div>
            </div>

            {showAdminLeft && (
                <div className={menu.userAction}>
                    <Button type="primary" block onClick={() => navigate('/profile')}>
                        Manage Plan
                    </Button>
                </div>
            )}
        </div>
    );
}
