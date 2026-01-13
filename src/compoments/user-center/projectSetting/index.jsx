import styles from './index.module.scss';
import { Button } from 'antd';
import { CrownThree } from '@icon-park/react';

export default function ProjectSet(){
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                Project name
            </div>
            <Button className={styles.UpdateBt}>
                Update name
            </Button>
            <div className={styles.title2}>
                Each project can be connected to only one website.
            </div>
            <hr className={styles.customHr}>
            </hr>

            <div className={styles.title}>
                Website URL
            </div>
            <div>
                baidu.com
            </div>
            <Button className={styles.UpdateBt}>
                Update URL
            </Button>
            <hr className={styles.customHr}></hr>

            <div className={styles.title}>Your Current Plan</div>

            
            <div className={styles.planCard}>
                <div className={styles.planInfo}>
                    
                    <CrownThree theme="filled" size="30" fill="#f5a623" className={styles.planIcon}/>
                    <div className={styles.planText}>
                        <div className={styles.planName}>Free Plan</div>
                        <div className={styles.planDesc}>
                            Basic features to get started
                        </div>
                    </div>
                </div>
                <Button className={styles.manageBtn}>
                    Select Plan
                </Button>
            </div>

        </div>
    )
}