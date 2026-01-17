import { Tooltip } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export default function LeftMenu() {
    const navigate = useNavigate();

    const buttonList = [
        { key: 'my-account', name: 'My Account', route: '/user-center' },
        { key: 'project-setting', name: 'Project Setting', route: '/user-center/project-setting' },
        { key: 'instalation', name: 'Instalation', route: '/user-center/instalation' },
        { key: 'plan&billing', name: 'Plan & Billing', route: '/user-center/plan-billing' },
    ];

    const isActive = (itemRoute) => {
        return location.pathname === itemRoute;
    };

    return (
        <div className={styles.menuBox}>
            <div className={styles.backRow} onClick={() => navigate('/admin')}>
                <span className={styles.backIcon}> ← </span>
                <span className={styles.backText}>Back to Workplace</span>
            </div>

            <div className={styles.buttonGroup}>
                {buttonList.map((item) => (
                    <Tooltip title={item.name} key={item.key}>
                        <div
                            className={`
                        ${styles.button} 
                        ${item.type === 'back' ? styles.backButton : ''}
                        ${isActive(item.route) ? styles.activeButton : ''}
                        `}
                            onClick={() => navigate(item.route)}
                        >
                            <div className={styles.buttonName}>{item.name}</div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
