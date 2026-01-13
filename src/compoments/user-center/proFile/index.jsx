import { Button } from 'antd';
import styles from './index.module.scss';

export default function ProFile(){
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                Profile
            </div>
            <div className={styles.title2}>
                Username
            </div>
            <div className={styles.name}>
                User_google_7684
            </div>
            <button className={styles.UpdateBt}>
                Update name
            </button>
        </div>
    )
}