import { Tooltip } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export default function LeftMenu() {
    const navigate = useNavigate();

    const buttonList = [
        
        { key: 'my-account', name: 'My Account', route: '/user-center' },
        { key: 'project-setting', name: 'Project Setting', route: '/admin/analyses' },
        { key: 'instalation', name: 'Instalation', route: '/' },
        { key: 'plan&billing', name: 'Plan & Billing', route: '/' },
    ];

    return (
        <div className={styles.menuBox}>
            <div
                className={styles.backRow}
                onClick={() => navigate('/admin')}
            >
                <span className={styles.backIcon} > ←  </span>
                <span className={styles.backText}>Back to Workplace</span>
            </div>

            <div className={styles.buttonGroup}>
                {buttonList.map(item => (
                    <Tooltip title={item.name} key={item.key}>
                        <div
                            className={`${styles.button} ${
                                item.type === 'back' ? styles.backButton : ''
                            }`}
                            onClick={() => navigate(item.route)}
                        >
                            
                            <div className={styles.buttonName}>
                                {item.name}
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
