import { CheckSmall, Link as LinkIcon } from '@icon-park/react';
import styles from './index.module.scss';

export default function Accounts() {
    
    const socialAccounts = [
        {
            name: "Google Account",
            desc: "zhiqianj68@gmail.com",
            iconColor: "#4285F4", // Google品牌色
            btnText: "Disconnect",
            link: "",
            openInNewTab: false,
            isExternal: false,
            status: "connected"
        },
        {
            name: "Microsoft Account",
            desc: "Connect to sign in with Microsoft",
            iconColor: "#00A4EF", // Microsoft品牌色
            btnText: "Connect",
            link: "https://account.live.com/Consent/Update?mkt=ZH-CN&uiflavor=web&id=293577&client_id=3e93534b-46d3-4311-a8a1-7497c6005018&ru=https://login.live.com/oauth20_authorize.srf%3fuaid%3d86cf55174a1f40ee8e18872f5ee451f7%26client_id%3d3e93534b-46d3-4311-a8a1-7497c6005018%26opid%3d4611CC84D3A1CFC8%26mkt%3dZH-CN%26opidt%3d1769421209",
            openInNewTab: true,
            isExternal: true,
            status: "disconnected"
        },
        {
            name: "Facebook",
            desc: "Connect to sign in with Facebook",
            iconColor: "#4a90e2", // Facebook品牌色
            btnText: "Connect",
            link: "https://www.facebook.com/v18.0/dialog/oauth?client_id=你的APPID&redirect_uri=你的回调地址",
            openInNewTab: true,
            isExternal: true,
            status: "disconnected"
        },
        {
            name: "X",
            desc: "Connect to sign in with X",
            iconColor: "#1DA1F2", // X(Twitter)品牌色
            btnText: "Connect",
            link: "https://api.twitter.com/oauth/authenticate?oauth_token=你的token",
            openInNewTab: true,
            isExternal: true,
            status: "disconnected"
        },
        {
            name: "LinkedIn",
            desc: "Connect to sign in with LinkedIn",
            iconColor: "#0077B5", // LinkedIn品牌色
            btnText: "Connect",
            link: "https://www.linkedin.com/oauth/v2/authorization?client_id=你的客户端ID&redirect_uri=你的回调地址&response_type=code",
            openInNewTab: true,
            isExternal: true,
            status: "disconnected"
        }
    ];

    const handleBtnClick = (account) => {
        // 处理解绑逻辑
        if (account.btnText === "Disconnect") {
            const confirmDisconnect = window.confirm(`Are you sure to disconnect ${account.name}?\nThis will unbind the account and you will no longer be able to log in with it.`);
            if (confirmDisconnect) {
                // 调用解绑接口（示例）
                // fetch('/api/unbind-account', { method: 'POST', body: JSON.stringify({ type: account.name }) });
                alert(`Disconnected ${account.name} successfully!`);
            }
            return;
        }

        // 处理绑定逻辑（外部链接跳转）
        if (account.isExternal && account.link) {
            // 提示用户即将跳转
            alert(`You will be redirected to ${account.name} authorization page to complete binding.`);
            window.open(account.link, '_blank', 'noopener,noreferrer');
        }
    };

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
                        <button className={styles.accountBtn} onClick={() => handleBtnClick(account)}>
                            {account.btnText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}