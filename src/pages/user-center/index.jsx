import '../../assets/css/user-center/index.scss';
import { commonStore } from '../../store';
import Leftmenu from '../../compoments/user-center/leftMenu';
import Accounts from '../../compoments/user-center/accounts';
import DeleteAccount from '../../compoments/user-center/delete';
import { Button, Input, message, Modal, Spin } from 'antd';
import { CheckSmall } from '@icon-park/react';
import { useState, useEffect } from 'react';
import { httpAccount } from '../../api/user-center';

export default function UserCenterIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchMockUserInfo = async () => {
        try {
            setLoading(true);

            const result = await httpAccount();

            if (result && result.data && result.data.account) {
                const { username, email, password } = result.data.account;
                setCurrentUserName(username);
                setCurrentEmail(email);
                setCurrentPassword(password || '');
                console.log('从接口获取的密码：', password);
            } else {
                throw new Error('数据格式异常');
            }

            message.success('User info loaded successfully');
        } catch (err) {
            console.error('Error fetching mock user info:', err);
            message.error('Failed to load user info, using default values');
            // 最终兜底
            setCurrentUserName('User_10086');
            setCurrentEmail('zhiqian@gmail.com');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMockUserInfo();
    }, []);

    const showModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);

        if (type === 'name') setNewUsername(currentUserName || '');
        if (type === 'email') setNewEmail(currentEmail || '');
        if (type === 'password') {
            setNewPassword('');
            setConfirmPassword('');
            console.log('当前password:', currentPassword);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalType('');
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleOk = () => {
        try {
            if (modalType === 'name') {
                console.log('更新后的用户名：', newUsername);
                setCurrentUserName(newUsername);
                message.success('Username updated successfully!');
            } else if (modalType === 'email') {
                console.log('更新后的邮箱：', newEmail);
                setCurrentEmail(newEmail);
                message.success('Email updated successfully!');
            } else if (modalType === 'password') {
                if (newPassword !== confirmPassword) {
                    message.error('Password do not match!');
                    return;
                }
                console.log('更新后的密码：', newPassword);
                setCurrentPassword(newPassword);
                message.success('Password updated successfully!');
            }
            handleCancel();
        } catch (err) {
            message.error('Update failed, please try again!');
        }
    };

    const isConfirmDisabled = () => {
        if (modalType === 'name') {
            return !newUsername.trim() || newUsername === currentUserName;
        }
        if (modalType === 'email') {
            return !newEmail.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(newEmail);
        }
        if (modalType === 'password') {
            return !newPassword.trim() || newPassword !== confirmPassword || newPassword.length < 6;
        }
        return true;
    };

    const renderModalContent = () => {
        switch (modalType) {
            case 'name':
                return (
                    <>
                        <div>Username</div>
                        <Input
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            maxLength={20}
                            placeholder="Enter new username"
                            disabled={loading} // 加载中禁用输入
                        />
                    </>
                );
            case 'email':
                return (
                    <>
                        <div>we'll send an email to the address for you to confirm.</div>
                        <div>Your email</div>
                        <Input
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            maxLength={50}
                            placeholder="Enter new email address"
                            disabled={loading}
                        />
                    </>
                );
            case 'password':
                return (
                    <>
                        <div>After setting your password, you can log in by your email and password.</div>
                        <div>New password</div>
                        <Input.Password
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password (at least 6 characters)"
                            style={{ marginBottom: 16 }}
                            disabled={loading}
                        />
                        <div>Confirm new password</div>
                        <Input.Password
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            disabled={loading}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    // const messageApi = commonStore((state) => state.messageApi);

    const socialAccounts = [
        {
            name: 'Google Account',
            desc: 'zhiqianj68@gmail.com',
            iconColor: '#4285F4',
            btnText: 'Disconnect',
        },
        {
            name: 'Microsoft Account',
            desc: 'Connect to sign in with Microsoft',
            iconColor: '#00A4EF',
            btnText: 'Connect',
        },
        {
            name: 'Facebook',
            desc: 'Connect to sign in with Facebook',
            iconColor: '#4a90e2',
            btnText: 'Connect',
        },
        {
            name: 'X',
            desc: 'Connect to sign in with X',
            iconColor: '#1DA1F2',
            btnText: 'Connect',
        },
        {
            name: 'LinkedIn',
            desc: 'Connect to sign in with LinkedIn',
            iconColor: '#0077B5',
            btnText: 'Connect',
        },
    ];

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                <div className="user-right-content">
                    {/* 修复：添加加载状态渲染，避免数据未加载完成时显示空值 */}
                    {loading ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '400px',
                            }}
                        >
                            <Spin size="large" tip="Loading user info..." />
                        </div>
                    ) : (
                        <>
                            <div className="block">
                                <div className="title2">Profile</div>
                                <div className="lightcontent">Username</div>
                                <div>{currentUserName}</div>
                                <div>
                                    <Button className="button" onClick={() => showModal('name')}>
                                        Update name
                                    </Button>
                                </div>
                            </div>
                            <div className="block">
                                <div className="title2">Sign-in details</div>
                                <div className="lightcontent">Email</div>

                                <div className="emailRow">
                                    <span className="name">{currentEmail}</span>
                                    <div className="verifiedGroup">
                                        <span className="verified">Verified</span>
                                        <span className="check">
                                            <CheckSmall theme="outline" size="20" fill="blue" />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Button className="button" onClick={() => showModal('email')}>
                                        Update email
                                    </Button>
                                </div>

                                <hr className="customHr"></hr>

                                <div className="lightcontent">Password</div>
                                <div>
                                    <Button className="button" onClick={() => showModal('password')}>
                                        Update Password
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Accounts />
                            </div>
                            <div>
                                <DeleteAccount />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal
                title={modalType === 'name' ? 'Update Username' : modalType === 'email' ? 'Update Email Address' : 'Update Password'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ disabled: isConfirmDisabled() }}
                destroyOnClose={true}
                maskClosable={false} // 防止点击遮罩层关闭
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
