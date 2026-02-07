import { useState, useEffect } from 'react'; // 新增 useEffect
import styles from './index.module.scss';
import { Button, Modal, Input, message, Spin } from 'antd'; // 新增 Spin 用于加载状态
import { CrownThree } from '@icon-park/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { httpProject } from '../../../api/user-center';

export default function ProjectSet() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [currentProjectName, setCurrentProjectName] = useState('Default Project'); // 新增项目名称状态
    const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState('baidu.com');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // 加载状态

    // 补全 Mock 数据获取函数
    const fetchMockUserInfo = async () => {
        try {
            setLoading(true);
            // 调用 Mock 接口获取项目数据
            const result = await httpProject();
            console.log('Mock 原始返回数据：', result);

            // 数据校验 & 赋值
            if (result && result.data && result.data.project) {
                const { name, url } = result.data.project;
                // 设置从 Mock 接口获取的真实数据
                setCurrentProjectName(name);
                setCurrentWebsiteUrl(url);
                message.success('Project info loaded successfully!');
            } else {
                throw new Error('Invalid project data format');
            }
        } catch (err) {
            // 异常处理 & 兜底数据
            console.error('Error fetching project info:', err);
            message.error('Failed to load project info, using default values');
            setCurrentProjectName('Default Project');
            setCurrentWebsiteUrl('baidu.com');
        } finally {
            // 无论成功失败都关闭加载状态
            setLoading(false);
        }
    };

    // 组件挂载时调用 Mock 接口
    useEffect(() => {
        fetchMockUserInfo();
    }, []); // 空依赖：仅挂载时执行一次

    const showModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);

        if (type === 'url') {
            setWebsiteUrl(currentWebsiteUrl);
        } else if (type === 'name') {
            setProjectName(currentProjectName);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalType('');
        setProjectName('');
        setWebsiteUrl('');
    };

    const handleOk = () => {
        try {
            if (modalType === 'name') {
                // 更新项目名称
                console.log('更新后的项目名称：', projectName);
                setCurrentProjectName(projectName);
                message.success('Project name updated successfully!');
            } else if (modalType === 'url') {
                // 更新 URL
                console.log('更新后的网站URL：', websiteUrl);
                setCurrentWebsiteUrl(websiteUrl);
                message.success('Website URL updated successfully!');
            }
            handleCancel();
        } catch (err) {
            message.error('Update failed, please try again!');
        }
    };

    // 优化禁用逻辑：确保输入有效且有修改
    const isConfirmDisabled = () => {
        if (modalType === 'name') {
            // 项目名称：非空 + 与当前值不同
            return !projectName.trim() || projectName.trim() === currentProjectName;
        } else if (modalType === 'url') {
            // URL：非空 + 与当前值不同
            return !websiteUrl.trim() || websiteUrl.trim() === currentWebsiteUrl;
        }
        return true;
    };

    const renderModalContent = () => {
        if (modalType === 'name') {
            return (
                <>
                    <div>Project name</div>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        maxLength={50}
                        placeholder="Enter new project name"
                        disabled={loading} // 加载中禁用输入
                    />
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
                    <Input
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="Enter new website URL"
                        maxLength={200}
                        disabled={loading} // 加载中禁用输入
                    />
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
            {/* 加载状态展示：避免数据未加载完成时显示默认值 */}
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '400px',
                    }}
                >
                    <Spin size="large" tip="Loading project info..." />
                </div>
            ) : (
                <>
                    {/* 项目名称区域 */}
                    <div className={styles.title}>Project name</div>
                    <div className={styles.currentValue}>{currentProjectName}</div>
                    <Button className={styles.UpdateBt} onClick={() => showModal('name')}>
                        Update name
                    </Button>
                    {/* URL 区域 */}
                    <div className={styles.title2}>Each project can be connected to only one website.</div>
                    <hr className={styles.customHr}></hr>
                    <div className={styles.title}>Website URL</div>
                    <div className={styles.currentValue}>{currentWebsiteUrl}</div>
                    <Button className={styles.UpdateBt} onClick={() => showModal('url')}>
                        Update URL
                    </Button>
                    {/* 套餐区域 */}
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
                </>
            )}

            {/* 弹窗 */}
            <Modal
                title={modalType === 'name' ? 'Update project name' : 'Add your website URL'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ disabled: isConfirmDisabled() }}
                maskClosable={false} // 防止点击遮罩层关闭
                destroyOnClose={true} // 关闭时销毁弹窗内容
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
