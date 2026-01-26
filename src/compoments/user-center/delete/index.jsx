import { Checkbox } from 'antd';
import styles from './index.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    // 打开弹窗
    const openModal = () => {
        setIsModalOpen(true);
        setIsChecked(false);
    };

    // 关闭弹窗
    const closeModal = () => {
        setIsModalOpen(false);
        setIsChecked(false);
    };

    const handleDeleteAccount = () => {
        navigate('/login/registry');
    };

    return (
        <>
            <a
                className={styles.container}
                href="javascript:;" // 保证手型光标，避免页面跳转
                onClick={openModal}
            >
                Permanently Delete Account
            </a>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    {/* 弹窗内容区：阻止点击内容区时关闭弹窗 */}
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* 弹窗头部：标题 + 关闭按钮 */}
                        <div className={styles.modalHeader}>
                            <h3>Are you sure to Delete Your Account?</h3>
                            <button className={styles.closeBtn} onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        {/* 弹窗主体：可放大量说明内容 */}
                        <div className={styles.modalBody}>
                            <p>You are about to delete your Crazy Egg account.Deleteing your account will delete all your date permanently.</p>
                            <p>All your data will be delete,and you will no longer be able to sign in or access any of your information.</p>
                            <p>The account will be disabled immediately.You won't be able to log in or access its content,invoices,or payment history</p>
                            <p className={styles.modalheight}>This action connot be undone.</p>
                            <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                            &nbsp; I understand the consequences and agree to proceed with the deactivation.
                        </div>

                        {/* 弹窗底部：操作按钮 */}
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={closeModal}>
                                Cancel
                            </button>
                            <button className={styles.deleteBtn} onClick={handleDeleteAccount} disabled={!isChecked}>
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
