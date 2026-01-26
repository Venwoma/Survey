import { Button, Spin } from 'antd';
import { useState } from 'react';
import styles from './index.module.scss';

export default function BillingDetails() {
    const [isLoading, setIsLoading] = useState(false);

    const handleMoreClick = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            window.location.reload();
        } catch (error) {
            console.error('刷新失败', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Spin spinning={isLoading} tip="Loading..." size="large" className={styles.spinWrapper}>
            <div className={styles.container}>
                {/* 顶部标题行 */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Billing Details</h3>
                    <Button className={styles.moreBtn} onClick={handleMoreClick} disabled={isLoading}>More</Button>
                </div>

                {/* 表格区域 */}
                <div className={styles.table}>
                    {/* 表头 */}
                    <div className={styles.tableHeader}>
                        <div className={styles.col}>Last Payment</div>
                        <div className={styles.col}>Next Charge</div>
                        <div className={styles.col}>Current Plan</div>
                        <div className={styles.col}>Status</div>
                    </div>

                    {/* 表格内容 */}
                    <div className={styles.tableRow}>
                        <div className={styles.col}>2025-12-17 15:00:54</div>
                        <div className={styles.col}>2125-11-23 15:00:54</div>
                        <div className={styles.col}>free</div>
                        <div className={styles.col}>ACTIVE</div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}
