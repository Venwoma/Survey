import { CheckSmall } from '@icon-park/react';
import styles from './index.module.scss';

export default function Accounts() {
    
    const socialAccounts = [
        {
            name: "Google Account",
            desc: "zhiqianj68@gmail.com",
            iconColor: "#4285F4", // Google品牌色
            btnText: "Disconnect"
        },
        {
            name: "Microsoft Account",
            desc: "Connect to sign in with Microsoft",
            iconColor: "#00A4EF", // Microsoft品牌色
            btnText: "Connect"
        },
        {
            name: "Facebook",
            desc: "Connect to sign in with Facebook",
            iconColor: "#4a90e2", // Facebook品牌色
            btnText: "Connect"
        },
        {
            name: "X",
            desc: "Connect to sign in with X",
            iconColor: "#1DA1F2", // X(Twitter)品牌色
            btnText: "Connect"
        },
        {
            name: "LinkedIn",
            desc: "Connect to sign in with LinkedIn",
            iconColor: "#0077B5", // LinkedIn品牌色
            btnText: "Connect"
        }
    ];

    return (
        <div className={styles.container}>
            {/* 标题部分 */}
            <div className={styles.title}>
                Connected Accounts
            </div>
            {/* 社交媒体列表容器 */}
            <div className={styles.accountList}>
                {socialAccounts.map((account, index) => (
                    <div key={index} className={styles.accountItem}>
                        {/* 单色块替代图标 - 核心修改部分 */}
                        <div 
                            className={styles.accountIcon}
                            style={{ 
                                backgroundColor: account.iconColor, // 背景色用品牌色
                                // 统一方块样式：50*50px、圆角、居中
                                width: '50px',
                                height: '50px',
                                borderRadius: '4px'
                            }} 
                        />
                        {/* 信息区域 */}
                        <div className={styles.accountInfo}>
                            <h3 className={styles.accountName}>{account.name}</h3>
                            <p className={styles.accountDesc}>{account.desc}</p>
                        </div>
                        {/* 按钮区域 */}
                        <button className={styles.accountBtn}>
                            {account.btnText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}