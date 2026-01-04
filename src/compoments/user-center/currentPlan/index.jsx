import { Button } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default function CurrentPlan() {
    return (
        <div className={styles.container}>
            {/* 标题 */}
            <h2 className={styles.title}>Your Current Plan</h2>

            {/* 套餐信息卡片 */}
            <div className={styles.planCard}>
                <div className={styles.planInfo}>
                    <CrownOutlined className={styles.planIcon} />
                    <div className={styles.planText}>
                        <div className={styles.planName}>Free Plan</div>
                        <div className={styles.planDesc}>
                            Basic features to get started
                        </div>
                    </div>
                </div>
                <Button className={styles.manageBtn}>
                    Manage Plan
                </Button>
            </div>

            {/* 数据统计区域 */}
            <div className={styles.statsRow}>
                {/* 已激活问卷 */}
                <div className={styles.statItem}>
                    <div className={styles.statLabel}>
                        SURVEYS ACTIVATED
                    </div>
                    <div className={styles.statValue}>
                        0 / 10 Activated
                    </div>
                    <div className={styles.progressBarWrap}>
                        <div className={styles.progressBar}></div>
                    </div>
                </div>

                {/* 已展示问卷 */}
                <div className={styles.statItem}>
                    <div className={styles.statLabel}>
                        SURVEY DISPLAYED
                    </div>
                    <div className={styles.statValue}>
                        0 / 50 Displays max
                    </div>
                    <div className={styles.progressBarWrap}>
                        <div className={styles.progressBar}></div>
                    </div>
                </div>
            </div>

            {/* 套餐权益列表 */}
            <div className={styles.benefitsRow}>
                <div className={styles.benefitItem}>- 50 survey displays</div>
                <div className={styles.benefitItem}>- 10 active survey slots</div>
                <div className={styles.benefitItem}>- 1 user seat included</div>
                <div className={styles.benefitItem}>- 1 domain site</div>
                <div className={styles.benefitItem}>- Basic data reports</div>
            </div>
        </div>
    );
}
