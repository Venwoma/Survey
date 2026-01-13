import { Button } from 'antd';
import styles from '../proFile/index.module.scss';
import { CheckSmall } from '@icon-park/react';

export default function SignIn(){
    return(
        <div className={styles.container}>

            <div className={styles.title}>
                Sign-in details
            </div>
            <div className={styles.title2}>
                Email
            </div>

            <div className={styles.emailRow}>
                <span className={styles.name}>zhiqianj68@gmail.com</span>
                <div className={styles.verifiedGroup}>
                    <span className={styles.verified}>Verified</span>
                    <span className={styles.check}>
                        <CheckSmall theme="outline" size="20" fill="blue"/>
                    </span>
                </div>
            </div>

            <button className={styles.UpdateBt}>
                Update email
            </button>

            <hr className={styles.customHr}></hr>
            
            <div className={styles.title2}>
                Password
            </div>
            <button className={styles.PasswordBt}>
                Update Password
            </button>

        </div>
        
    )
}
