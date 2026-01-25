import { useState } from 'react';
import styles from './index.module.scss';
import { Button, Modal, Input, message } from 'antd';
import { CrownThree } from '@icon-park/react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProjectSet() {
    const [isModalOpen, setIsModalOpen] = useState(false); //状态变量，改变变量的函数
    const [modalType, setModalType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('baidu.com');
    const navigate = useNavigate();

    const showModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);

        if (type === 'url') {
            setWebsiteUrl(currentWebsiteUrl);
        } else if (type === 'name') {
            setProjectName('');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalType('');
        setProjectName('');
        setWebsiteUrl('');
    };

    const handleOk = () => {
        if (modalType === 'name') {
            console.log('更新后的项目名称：', projectName);
        } else if (modalType === 'url') {
            console.log('更新后的网站URL：', websiteUrl);
            setCurrentWebsiteUrl(websiteUrl);
            message.success('Website URL updated successfully!');
        }

        handleCancel();
    };

    const isConfirmDisabled = () => {
        if (modalType === 'name') {
            return !projectName.trim();
        } else if (modalType === 'url') {
            return !websiteUrl.trim() || websiteUrl.trim() === currentWebsiteUrl;
        }
        return true;
    };

    const renderModalContent = () => {
        if (modalType === 'name') {
            return (
                <>
                    <div>Project name</div>
                    <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} maxLength={50} />
                </>
            );
        } else if (modalType === 'url') {
            return (
                <>
                    <p style={{ marginBottom: 16 }}>
                        We recommend pausing survey on your old website and creating new ones on your new site. Your previous responses and analysis will be
                        preserved.
                    </p>
                    <div style={{ marginBottom: 8 }}>Website URL</div>
                    <Input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Enter new website URL" maxLength={200} />
                </>
            );
        }
        return null;
    };

    const goToPlanPage = () => {
        navigate('/plans');
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Project name</div>
            <Button className={styles.UpdateBt} onClick={() => showModal('name')}>
                Update name
            </Button>

            <div className={styles.title2}>Each project can be connected to only one website.</div>
            <hr className={styles.customHr}></hr>

            <div className={styles.title}>Website URL</div>
            <div>{currentWebsiteUrl}</div>
            <Button className={styles.UpdateBt} onClick={() => showModal('url')}>
                Update URL
            </Button>

            <hr className={styles.customHr}></hr>

            <div className={styles.title}>Your Current Plan</div>

            <div className={styles.planCard}>
                <div className={styles.planInfo}>
                    <CrownThree theme="filled" size="30" fill="#f5a623" className={styles.planIcon} />
                    <div className={styles.planText}>
                        <div className={styles.planName}>Free Plan</div>
                        <div className={styles.planDesc}>Basic features to get started</div>
                    </div>
                </div>
                <Button className={styles.manageBtn} onClick={goToPlanPage}>
                    Select Plan
                </Button>
            </div>

            <Modal
                title={modalType === 'name' ? 'Update project name' : 'Add your website URL'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ disabled: isConfirmDisabled() }}
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
