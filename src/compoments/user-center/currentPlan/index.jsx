import { Button } from 'antd';
import { DiamondOutlined } from '@ant-design/icons';
import './index.module.scss'

export default function CurrentPlan() {
  return (
    <div style={styles.container}>
      {/* 标题 */}
      <h2 style={styles.title}>Your Current Plan</h2>

      {/* 套餐信息卡片 */}
      <div style={styles.planCard}>
        <div style={styles.planInfo}>
          <DiamondOutlined style={styles.planIcon} />
          <div style={styles.planText}>
            <div style={styles.planName}>Free Plan</div>
            <div style={styles.planDesc}>Basic features to get started</div>
          </div>
        </div>
        <Button style={styles.manageBtn}>Manage Plan</Button>
      </div>

      {/* 数据统计区域 */}
      <div style={styles.statsRow}>
        {/* 已激活问卷 */}
        <div style={styles.statItem}>
          <div style={styles.statLabel}>SURVEYS ACTIVATED</div>
          <div style={styles.statValue}>0 /10 Activated</div>
          <div style={styles.progressBarWrap}>
            <div style={styles.progressBar}></div>
          </div>
        </div>

        {/* 已展示问卷 */}
        <div style={styles.statItem}>
          <div style={styles.statLabel}>SURVEY DISPLAYED</div>
          <div style={styles.statValue}>0 /50 Displays max</div>
          <div style={styles.progressBarWrap}>
            <div style={styles.progressBar}></div>
          </div>
        </div>
      </div>

      {/* 套餐权益列表 */}
      <div style={styles.benefitsRow}>
        <div style={styles.benefitItem}>- 50 survey displays</div>
        <div style={styles.benefitItem}>- 10 active survey slots</div>
        <div style={styles.benefitItem}>- 1 user seat included</div>
        <div style={styles.benefitItem}>- 1 domain site</div>
        <div style={styles.benefitItem}>- Basic data reports</div>
      </div>
    </div>
  );
}
